const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const DataLoader = require('dataloader')
const merge = require('lodash.merge')

const typeDefs = require('./schemas')

// Load resolvers
const User = require('./resolvers/user')
const Collection = require('./resolvers/collection')
const Item = require('./resolvers/item')
const Settings = require('./resolvers/settings')

const userSelector = require('./selectors/user')
const collectionSelector = require('./selectors/collection')
const itemSelector = require('./selectors/item')
const auth = require('./util/auth')
const { Forbidden } = require('./util/errors')

function multiLoader(createLoader) {
  const cache = new Map()

  return args => {
    const cacheKey = JSON.stringify(args)

    if (cache.has(cacheKey)) return cache.get(cacheKey)

    const loader = createLoader(args)

    cache.set(cacheKey, loader)

    return loader
  }
}

// Generate the graphql schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: merge(User, Collection, Item, Settings),
})

function extractToken(request) {
  return request.get('Authorization') || request.query.jwt
}

async function populateUser(context, token) {
  if (token) {
    try {
      context.user = await auth.checkAuthorization(token)
    } catch (err) {
      if (!(err instanceof Forbidden)) {
        throw err
      }
    }
  }

  if (context.user) {
    context.loaders.user.prime('me', context.user)
    context.loaders.user.prime(context.user.id, context.user)
  }
}

module.exports = graphqlExpress(async request => {
  const context = { loaders: {}, request }

  // Initialize loaders
  context.loaders.user = new DataLoader(ids =>
    userSelector(context).findByIds(ids),
  )
  context.loaders.collection = new DataLoader(ids =>
    collectionSelector(context).findByIds(ids),
  )
  context.loaders.item = new DataLoader(ids =>
    itemSelector(context).findByIds(ids),
  )

  // Initialize multiLoaders
  // multi loaders are lazy loaded loaders who can handle arguments
  context.loaders.collectionsByOwner = multiLoader(
    args =>
      new DataLoader(async ids => {
        const collectionsByOwner = await collectionSelector(
          context,
        ).findByOwners(ids, args)

        collectionsByOwner.forEach(collections =>
          collections.forEach(collection =>
            context.loaders.collection.prime(collection.id, collection),
          ),
        )

        return collectionsByOwner
      }),
  )
  context.loaders.itemsByCollection = multiLoader(
    args =>
      new DataLoader(async ids => {
        const itemsByCollection = await itemSelector(context).findByCollections(
          ids,
          args,
        )

        itemsByCollection.forEach(items =>
          items.forEach(item => context.loaders.item.prime(item.id, item)),
        )

        return itemsByCollection
      }),
  )

  // Try to set context.user

  const token = extractToken(request)
  if (token) await populateUser(context, token)

  return { schema, context, debug: true }
})
