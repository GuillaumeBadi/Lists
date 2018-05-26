const { find, filter } = require('lodash')
const collectionSelector = require('../selectors/collection')
const userSelector = require('../selectors/user')
const collectionMutation = require('../mutations/collection')
const readability = require('../util/readability')

module.exports = {
  RootQuery: {
    collections: () => ({}),
    collection: (_, { id }, ctx) => ctx.loaders.collection.load(id),
  },
  RootMutation: {
    createCollection: async (_, args, ctx) => {
      const collection = await collectionMutation(ctx).create(ctx.user.id, args)

      ctx.loaders.collection.prime(collection.id, collection)

      return collection
    },
    updateCollection: async (_, { id, name, description }, ctx) => {
      const exists = await ctx.loaders.collection.load(id)

      if (!exists) throw new Error('Collection not found')

      const collection = await collectionMutation(ctx).update(id, {
        name,
        description,
      })

      ctx.loaders.collection.clear(collection.id)

      return collection
    },
    removeCollection: async (_, { id }, ctx) => {
      const collection = await ctx.loaders.collection.load(id)

      if (!collection) throw new Error('Collection not found')

      await collectionMutation(ctx).delete(id)

      return collection
    },
    async addCollectionItem(_, { collectionId, type, value }, ctx) {
      const collection = await ctx.loaders.collection.load(collectionId)

      if (!collection) {
        throw new ResourceNotFoundError('Collection not found')
      }

      try {
        value = JSON.parse(value)
        const source = await readability(value.url)

        const item = await collectionMutation(ctx).addItem(collection, {
          type,
          value: Object.assign(value, { source }),
        })

        return item
      } catch (e) {
        console.error(e)
      }
    },
  },
  Collection: {
    owner: (collection, args, ctx) => ctx.loaders.user.load(collection.ownerId),
    items: async (collection, args, ctx) => {
      const items = await ctx.loaders
        .itemsByCollection(args)
        .load(collection.id)

      return { nodes: items }
    },
  },
  CollectionConnection: {
    totalCount: (parent, args, ctx) => collectionSelector(ctx).count(),
    nodes: ({ nodes }) => nodes,
    edges: ({ nodes }) => nodes,
  },
  CollectionEdge: {
    node: collection => collection,
    cursor: collection => collection.id,
  },
}
