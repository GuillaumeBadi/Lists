const { makeExecutableSchema } = require('graphql-tools')
const merge = require('lodash.merge')
const User = require('./user')
const Collection = require('./collection')
const Item = require('./item')

const RootQuery = `
  type RootQuery {
    collections(offset: Int, limit: Int = 50): CollectionPagination
    user(id: Int!): User
    users(offset: Int, limit: Int = 50): UserPagination
    item(id: Int!): Item
  }
`
const RootMutation = `
  type RootMutation {
    createCollection (
      ownerId: Int!
      name: String!
      description: String
    ): Collection

    addCollectionItem (
      ownerId: Int!
      collectionId: Int!
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
const Schemas = [User, Collection, Item]

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
