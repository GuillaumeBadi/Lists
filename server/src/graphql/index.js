const { makeExecutableSchema } = require('graphql-tools')
const merge = require('lodash.merge')
const User = require('./user')
const List = require('./list')

const RootQuery = `
  type RootQuery {
    lists(offset: Int, limit: Int = 50): ListPagination
    user(id: Int!): User
    users(offset: Int, limit: Int = 50): UserPagination
  }
`
const RootMutation = `
  type RootMutation {
    createList (
      userId: Int!
      name: String!
      description: String
    ): List
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

module.exports =  makeExecutableSchema({
  typeDefs: [
    RootQuery,
    RootMutation,
    SchemaDefinition,
    User.typeDefs,
    List.typeDefs
  ],
  resolvers: merge(
    User.resolvers,
    List.resolvers,
  )
});
