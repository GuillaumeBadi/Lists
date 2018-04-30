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
  }

  type ListPagination {
    totalCount: Int
    results: [List]
  }
`

const lists = [
  { id: 1, userId: 1, name: 'Introduction to GraphQL' },
  { id: 2, userId: 2, name: 'Welcome to Meteor' },
  { id: 3, userId: 2, name: 'Advanced GraphQL' },
  { id: 4, userId: 3, name: 'Launchpad is Cool' }
]

const resolvers = {
  RootQuery: {
    lists: () => ({})
  },
  RootMutation: {
    async createList(_, payload) {
      const list = await listMutation.create(payload)

      return list
    }
  },
  List: {
    user: list => userSelector.findById(list.userId)
  },
  ListPagination: {
    totalCount: () => listSelector.count(),
    results: (_, { limit, offset }) => listSelector.find({ limit, offset })
  }
}

module.exports = {
  typeDefs: () => [typeDefs],
  resolvers
}
