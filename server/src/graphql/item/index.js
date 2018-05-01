const { find, filter } = require('lodash')
const itemSelector = require('../../selectors/item')
const userSelector = require('../../selectors/user')
const listMutation = require('../../mutations/list')

const typeDefs = `
  type Item {
    id: Int!
    listId: Int!
    index: Int
    type: String
    value: String
    createdAt: String
    updatedAt: String
  }

  type ItemPagination {
    totalCount: Int
    results: [Item]
  }
`

const resolvers = {
  RootQuery: {
    item: (_, { id }) => itemSelector.findById(id)
  },
  RootMutation: {
  },
  Item: { },
  ItemPagination: {
    totalCount: () => itemSelector.count(),
    results: (_, { limit, offset }) => itemSelector.find({ limit, offset })
  }
}

module.exports = {
  typeDefs: () => [typeDefs],
  resolvers
}
