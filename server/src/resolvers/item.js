const { find, filter } = require('lodash')
const itemSelector = require('../selectors/item')

module.exports = {
  RootQuery: {
    item: (_, { id }) => itemSelector.findById(id)
  },
  RootMutation: { },
  Item: { },
  ItemConnection: {
    totalCount: () => itemSelector.count(),
    nodes: ({ nodes }) => nodes
  },
  ListItem: {},
  TextItem: {},
  CheckableItem: {},
  LinkItem: {},
  ItemValue: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'LIST': return 'ListItem'
        case 'TEXT': return 'TextItem'
        case 'CHECKABLE': return 'CheckableItem'
        case 'LINK': return 'LinkItem'
      }
    }
  }
}
