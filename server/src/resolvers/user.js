const { find, filter } = require('lodash')
const auth = require('../util/auth')
const userSelector = require('../selectors/user')
const collectionSelector = require('../selectors/collection')
const userMutation = require('../mutations/user')

module.exports = {
  RootQuery: {
    viewer: (_, __, ctx) => ctx.user && ctx.loaders.user.load('me'),
    user: (_, { id }, ctx) => ctx.loaders.user.load(id),
    users: () => ({}),
    signin: async (_, payload, ctx) => {
      const token = ctx.request.get('Authorization') || ctx.request.query.jwt

      ctx.user = await auth.checkAuthorization(token)

      return ctx.user
    },
  },
  RootMutation: {
    signup: async (_, payload, ctx) => {
      ctx.user = await userMutation(ctx).create(payload)

      ctx.loaders.user.prime(ctx.user.id, ctx.user)

      return ctx.user
    }
  },
  User: {
    collections: async (user, args, ctx) => {
      const collections = await ctx.loaders.collectionsByOwner(args).load(user.id)

      return { nodes: collections }
    },
    jwt: (user, args, ctx) => {
      if ((ctx.user && user.id !== ctx.user.id) || !ctx.user) {
        return null
      }
      return auth.getAuthorization(user)
    },
  },
  UserConnection: {
    // FIXME
    totalCount: (parent, args, ctx) =>
      userSelector(ctx).count(),
    // FIXME
    nodes: (_, { limit, offset }, ctx) =>
      userSelector(ctx).find({ limit, offset }),
  },
}
