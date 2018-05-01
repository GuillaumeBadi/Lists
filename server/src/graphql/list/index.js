const { find, filter } = require('lodash')
const listSelector = require('../../selectors/list')
const userSelector = require('../../selectors/user')
const listMutation = require('../../mutations/list')

const typeDefs = `
  type List {
    id: Int!
    name: String
    user: User
    description: String
    createdAt: String
    updatedAt: String
  }

  type ListPagination {
    totalCount: Int
    results: [List]
  }
`

const resolvers = {
  RootQuery: {
    lists: () => ({})
  },
  RootMutation: {
    async createList(_, payload, request) {
      const list = await listMutation(request).create(payload)

      return list
    },
    async addListItem(_, payload, request) {
      const list = await listSelector(request).findById(payload.listId)

      if (!list) {
        throw new ResourceNotFoundError('List not found')
      }

      const item = await listMutation(request).addItem(list, payload)

      return item
    }
  },
  List: {
    user: (list, args, request) => userSelector(request).findById(list.userId)
  },
  ListPagination: {
    totalCount: (parent, args, request) =>
      listSelector(request).count(),
    results: (_, { limit, offset }, request) =>
      listSelector(request).find({ limit, offset })
  }
}

module.exports = {
  typeDefs: () => [typeDefs],
  resolvers
}
