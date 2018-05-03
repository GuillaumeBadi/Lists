const { find, filter } = require('lodash')
const auth = require('../../util/auth')
const userSelector = require('../../selectors/user')
const collectionSelector = require('../../selectors/collection')
const userMutation = require('../../mutations/user')

const typeDefs = `
  type User {
    id: Int!
    email: String
    username: String
    jwt: String
    collections: [Collection]
    settings: Settings
  }

  type UserPagination {
    totalCount: Int
    results: [User]
  }
`

const resolvers = {
  RootQuery: {
    viewer: (_, __, req) => req.user && userSelector(req).findById(req.user.id),
    user: (_, { id }, req) => userSelector(req).findById(id),
    users: () => ({}),
    authenticate: async (_, payload, req) => {
      const token = req.get('Authorization') || req.query.jwt

      req.user = await auth.checkAuthorization(token)

      return req.user
    }
  },
  RootMutation: {
    register: async (_, payload, req) => {
      const user = await userMutation(req).create(payload)

      req.__isNewUser = true

      return user
    }
  },
  User: {
    collections: (user, args, req) =>
      collectionSelector(req).find({ where: { ownerId: user.id } }),
    jwt: (user, args, req) => {
      if (!req.__isNewUser && ((req.user && user.id !== req.user.id) || !req.user)) {
        return null
      }
      return auth.getAuthorization(user)
    }
  },
  UserPagination: {
    totalCount: (parent, args, req) =>
      userSelector(req).count(),
    results: (_, { limit, offset }, req) =>
      userSelector(req).find({ limit, offset })
  }
}

module.exports = {
  typeDefs: () => [typeDefs],
  resolvers
}
