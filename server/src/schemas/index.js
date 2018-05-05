const path = require('path')
const fs = require('fs')

// Yes dirty buth it's the easier way to create the schema without dependency issues
const schemas = [
  fs.readFileSync(path.join(__dirname, "item.graphql"), "utf8"),
  fs.readFileSync(path.join(__dirname, "settings.graphql"), "utf8"),
  fs.readFileSync(path.join(__dirname, "collection.graphql"), "utf8"),
  fs.readFileSync(path.join(__dirname, "user.graphql"), "utf8")
].concat()

const RootQuery = `
  type RootQuery {
    viewer: User
    user(id: Int!): User
    users(offset: Int, limit: Int = 50): UserConnection
    signin (username: String!, password: String!): User
    collections(offset: Int, limit: Int = 50): CollectionConnection
    item(id: Int!): Item
  }
`

const RootMutation = `
  type RootMutation {
    signup (
      username: String!
      email: String!
      password: String!
      pictureurl: String
    ): User

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
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

module.exports = [SchemaDefinition, RootQuery, RootMutation, ...schemas]
