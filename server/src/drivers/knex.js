const Knex = require('knex')
const config = require('../../knexfile')

const { NODE_ENV } = process.env

const knex = Knex(config[NODE_ENV.toLowerCase()])

module.exports = knex
