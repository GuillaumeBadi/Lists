const express = require('express')
const bodyParser = require('body-parser')
const { graphiqlExpress } = require('apollo-server-express')
const Puid = require('puid')

const graphql = require('./graphql')
const auth = require('./util/auth')
const { NotFound, APIError } = require('./util/errors')

const puid = new Puid()
const app = express()

app
  .use((req, res, next) => {
    req.locals = { requestId: puid.generate() }
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )
    res.set('X-Request-Id', req.locals.requestId)
    next()
  })
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/graphql', graphql)
  .use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  .use((req, res, next) => next(new NotFound()))
  .use((err, req, res, next) => {
    let error

    // log stack here

    if (err instanceof APIError) {
      res.status(err.status)
      error = err.serialize()
    } else {
      res.status(500)
      error = { status: 500, type: 'Server error' }
    }

    res.json(error)
  })

module.exports = app
