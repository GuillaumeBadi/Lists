const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
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
const auth = require('./util/auth')
const { Forbidden } = require('./util/errors')

// Generate the graphql schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: merge(User, Collection, Item, Settings)
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
    context.loaders.userLoader.prime('me', context.user)
  }
}

module.exports = graphqlExpress(async request => {
  const context = { loaders: {}, request }

  // Initialize loaders
  context.loaders.userLoader = new DataLoader(ids =>
    userSelector(request).findByIds(ids))
  context.loaders.listLoader = new DataLoader(ids =>
    collectionSelector(request).findByIds(ids))

  // Try to set context.user
  const token = extractToken(request)
  if (token) await populateUser(context, token)

  return { schema, context, debug: true }
})
