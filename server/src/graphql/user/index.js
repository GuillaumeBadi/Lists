const { find, filter } = require('lodash')
const userSelector = require('../../selectors/user')
const collectionSelector = require('../../selectors/collection')
const userMutation = require('../../mutations/user')

const typeDefs = `
  type User {
    id: Int!
    email: String
    username: String
    collections: [Collection]
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
    collections: (user, args, request) =>
      collectionSelector(request).find({ where: { ownerId: user.id } })
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
