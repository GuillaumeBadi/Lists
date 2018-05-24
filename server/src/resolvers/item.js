const { find, filter } = require('lodash')
const itemSelector = require('../selectors/item')
const itemMutation = require('../mutations/item')

module.exports = {
  RootQuery: {
    item: (_, { id }) => itemSelector.findById(id),
  },
  RootMutation: {
    removeItem: async (_, { id }, ctx) => {
      const item = await ctx.loaders.item.load(id)

      if (!item) {
        throw new Error('Item not found')
      }

      await itemMutation(ctx).delete(id)
      return item
    },
  },
  Item: {},
  ItemConnection: {
    totalCount: () => itemSelector.count(),
    nodes: ({ nodes }) => nodes,
  },
  ListItem: {},
  TextItem: {},
  CheckableItem: {},
  LinkItem: {},
  ItemValue: {
    __resolveType(obj) {
      switch (obj.type) {
        case 'LIST':
          return 'ListItem'
        case 'TEXT':
          return 'TextItem'
        case 'CHECKABLE':
          return 'CheckableItem'
        case 'LINK':
          return 'LinkItem'
      }
    },
  },
}
