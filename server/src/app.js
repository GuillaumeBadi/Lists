const express = require('express')
const bodyParser = require('body-parser')

const router = require('./controllers')

const app = express()

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(router)

module.exports = app
