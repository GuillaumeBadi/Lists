const { makeExecutableSchema } = require('graphql-tools')
const merge = require('lodash.merge')
const User = require('./user')
const List = require('./list')
const Item = require('./item')

const RootQuery = `
  type RootQuery {
    lists(offset: Int, limit: Int = 50): ListPagination
    user(id: Int!): User
    users(offset: Int, limit: Int = 50): UserPagination
    item(id: Int!): Item
  }
`
const RootMutation = `
  type RootMutation {
    createList (
      userId: Int!
      name: String!
      description: String
    ): List

    addListItem (
      userId: Int!
      listId: Int!
      type: String!
      value: String!
    ): Item

    createUser (
      username: String!
      email: String!
      password: String!
      pictureUrl: String
    ): User
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`
const Schemas = [User, List, Item]

const Schema = {
  typeDefs: [
    RootQuery,
    RootMutation,
    SchemaDefinition,
    ...Schemas.map(type => type.typeDefs)
  ],
  resolvers: merge(...Schemas.map(type => type.resolvers))
}

module.exports = makeExecutableSchema(Schema);
