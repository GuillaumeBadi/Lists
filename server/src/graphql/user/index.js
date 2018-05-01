const { find, filter } = require('lodash')
const userSelector = require('../../selectors/user')
const listSelector = require('../../selectors/list')
const userMutation = require('../../mutations/user')

const typeDefs = `
  type User {
    id: Int!
    email: String
    username: String
    lists: [List]
  }

  type UserPagination {
    totalCount: Int
    results: [User]
  }
`

const resolvers = {
  RootQuery: {
    user: (_, { id }, request) => userSelector(request).findById(id),
    users: () => ({})
  },
  RootMutation: {
    async createUser(_, payload, request) {
      const user = await userMutation(request).create(payload)

      return user
    }
  },
  User: {
    lists: (user, args, request) =>
      listSelector(request).find({ where: { userId: user.id } })
  },
  UserPagination: {
    totalCount: (parent, args, request) =>
      userSelector(request).count(),
    results: (_, { limit, offset }, request) =>
      userSelector(request).find({ limit, offset })
  }
}

module.exports = {
  typeDefs: () => [typeDefs],
  resolvers
}
