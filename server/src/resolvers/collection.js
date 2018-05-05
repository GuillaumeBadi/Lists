const { find, filter } = require('lodash')
const collectionSelector = require('../selectors/collection')
const userSelector = require('../selectors/user')
const collectionMutation = require('../mutations/collection')

module.exports = {
  RootQuery: {
    collections: () => ({})
  },
  RootMutation: {
    async createCollection(_, payload, request) {
      const collection = await collectionMutation(request).create(payload)

      return collection
    },
    async addCollectionItem(_, payload, request) {
      const collection = await collectionSelector(request).findById(payload.collectionId)

      if (!collection) {
        throw new ResourceNotFoundError('Collection not found')
      }

      const item = await collectionMutation(request).addItem(collection, payload)

      return item
    }
  },
  Collection: {
    user: (collection, args, request) => userSelector(request).findById(collection.ownerId)
  },
  CollectionConnection: {
    totalCount: (parent, args, request) =>
      collectionSelector(request).count(),
    nodes: (_, { limit, offset }, request) =>
      collectionSelector(request).find({ limit, offset })
  }
}
