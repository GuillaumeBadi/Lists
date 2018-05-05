const { find, filter } = require('lodash')
const auth = require('../util/auth')
const userSelector = require('../selectors/user')
const collectionSelector = require('../selectors/collection')
const userMutation = require('../mutations/user')

module.exports = {
  RootQuery: {
    viewer: (_, __, ctx) => ctx.user && ctx.loaders.userLoader.load('me'),
    user: (_, { id }, ctx) => ctx.loaders.userLoader.load(id),
    users: () => ({}),
    signin: async (_, payload, ctx) => {
      const token = ctx.get('Authorization') || ctx.query.jwt

      ctx.user = await auth.checkAuthorization(token)

      return ctx.user
    }
  },
  RootMutation: {
    signup: async (_, payload, ctx) => {
      ctx.user = await userMutation(ctx).create(payload)

      return user
    }
  },
  User: {
    collections: (user, args, ctx) =>
      collectionSelector(ctx).find({ where: { ownerId: user.id } }),
    jwt: (user, args, ctx) => {
      if ((ctx.user && user.id !== ctx.user.id) || !ctx.user) {
        return null
      }
      return auth.getAuthorization(user)
    }
  },
  UserConnection: {
    totalCount: (parent, args, ctx) =>
      userSelector(ctx).count(),
    nodes: (_, { limit, offset }, ctx) =>
      userSelector(ctx).find({ limit, offset })
  }
}
