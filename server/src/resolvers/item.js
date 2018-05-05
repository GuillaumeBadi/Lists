const { find, filter } = require('lodash')
const itemSelector = require('../selectors/item')

module.exports = {
  RootQuery: {
    item: (_, { id }) => itemSelector.findById(id)
  },
  RootMutation: {
  },
  Item: { },
  ItemConnection: {
    totalCount: () => itemSelector.count(),
    nodes: (_, { limit, offset }) => itemSelector.find({ limit, offset })
  }
}
