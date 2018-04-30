const { find, filter } = require('lodash')
const userSelector = require('../../selectors/user')
const listSelector = require('../../selectors/list')

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

// example data
const users = [
  { id: 1, email: 'tom@gmail.com', username: 'Coleman' },
  { id: 2, email: 'sashko@gmail.com', username: 'Stubailo' },
  { id: 3, email: 'mikhail@gmail.com', username: 'Novikov' }
]

const lists = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }
]

const resolvers = {
  RootQuery: {
    user: (_, { id }) => userSelector.findById(id),
    users: () => ({})
  },
  User: {
    lists: user => listSelector.find({ where: { userId: user.id } })
  },
  UserPagination: {
    totalCount: () => userSelector.count(),
    results: (_, { limit, offset }) => userSelector.find({ limit, offset })
  }
}

module.exports = {
  typeDefs: () => [typeDefs],
  resolvers
}
