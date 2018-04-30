const { Router } = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('../graphql')
const error = require('./error')

const router = Router()
  .use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: {
      // user: userType,
      // list: listType
    // },
    graphiql: false,
  }))
  .use((req, res, next) => {
    res.json({
      api: 'Lists'
    })
  })
  .use(error)

module.exports = router
