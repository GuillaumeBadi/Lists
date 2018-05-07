const groupBy = require('lodash.groupby')
const orderBy = require('lodash.orderby')
const knex = require('../drivers/knex')

module.exports = context => ({
  async findById(id) {
    return knex('collections').select('*').where({ id }).first()
  },


  async findByIds(ids) {
    const collections = await knex('collections').select('*').whereIn('id', ids)

    return ids.map(id => collections.find(collection => Number(collection.id) === Number(id)))
  },

  // one request by ownerId
  async findByOwners(ownerIds, args) {
    let queries

    if (ownerIds.length >= 100) throw new Error('Overcomplicated query')
    if (args.first && args.last) throw new Error('Argument first and last are incompatible')
    if (args.after && args.before) throw new Error('Argument first and last are incompatible')

    queries = ownerIds.map(ownerId => knex('collections').select('*').where({ ownerId }))

    const order = args.last ? 'ASC' : 'DESC'

    queries = queries.map(query =>
      query.orderBy('createdAt', order)
        .orderBy('id', order)
        .limit(Number(args.last || args.first) * ownerIds.length))

    if (args.after) queries.forEach(query => query.where('id', '<', args.after))
    if (args.before) queries.forEach(query => query.where('id', '>', args.before))

    let collections = await Promise.all(queries)

    // flatten array
    collections = Array.prototype.concat.apply(...collections, [])

    const collectionsByOwner = groupBy(collections, 'ownerId')

    return ownerIds.map(ownerId =>
      orderBy(collectionsByOwner[ownerId], ['createdAt', 'id'], ['desc', 'desc']) || [])
  },

  // TODO to trash
  async find({ limit, offset }) {
    const query = knex('collections').select('*')

    if (limit) query.limit(limit)
    if (offset) query.offset(offset)

    return query
  },

  // count all collections record in db
  async count() {
    const [{ count }] = await knex('collections').count()

    return count
  }
})
