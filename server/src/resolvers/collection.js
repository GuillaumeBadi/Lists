const { find, filter } = require('lodash')
const collectionSelector = require('../selectors/collection')
const userSelector = require('../selectors/user')
const collectionMutation = require('../mutations/collection')

module.exports = {
  RootQuery: {
    collections: () => ({})
  },
  RootMutation: {
    async createCollection(_, payload, ctx) {
      const collection = await collectionMutation(ctx).create(ctx.user.id, payload)

      ctx.loaders.collection.prime(collection.id, collection)

      return collection
    },
    async addCollectionItem(_, payload, ctx) {
      const collection = await collectionSelector(ctx).findById(payload.collectionId)

      if (!collection) {
        throw new ResourceNotFoundError('Collection not found')
      }

      const item = await collectionMutation(ctx).addItem(collection, payload)

      return item
    }
  },
  Collection: {
    user: (collection, args, ctx) => userSelector(ctx).findById(collection.ownerId)
  },
  CollectionConnection: {
    totalCount: (parent, args, ctx) =>
      collectionSelector(ctx).count(),
    nodes: ({ nodes }) => nodes,
    edges: ({ nodes }) => nodes
  },
  CollectionEdge: {
    node: (collection) => collection,
    cursor: (collection) => collection.id
  }
}
