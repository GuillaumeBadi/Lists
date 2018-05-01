const { Router } = require('express')
const graphqlHTTP = require('express-graphql')

const auth = require('./auth')
const schema = require('../graphql')
const error = require('./error')

const router = Router()
  .use(auth.router)
  .use(auth.authenticate)
  .use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: {
      // user: userType,
      // list: listType
    // },
    graphiql: false,
  }))
  .use(error.notFoundMiddleware)
  .use(error.errorMiddleware)

module.exports = router
