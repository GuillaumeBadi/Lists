const groupBy = require('lodash.groupby')
const orderBy = require('lodash.orderby')
const knex = require('../drivers/knex')

module.exports = request => ({
  async findById(id) {
    return knex('items').select('*').where({ id }).first()
  },

  async findByIds(ids) {
    const items = await knex('items').select('*').whereIn('id', ids)

    return ids.map(id => items.find(item => Number(item.id) === Number(id)))
  },

  // one request by ownerId
  async findByCollections(collectionsIds, args) {
    let queries

    if (collectionsIds.length >= 1000) throw new Error('Overcomplicated query')
    if (args.first && args.last) throw new Error('Argument first and last are incompatible')
    if (args.after && args.before) throw new Error('Argument first and last are incompatible')

    queries = collectionsIds.map(collectionId => knex('items').select('*').where({ collectionId }))

    const order = args.last ? 'ASC' : 'DESC'

    queries = queries.map(query =>
      query.orderBy('index', order)
      .limit(Number(args.last || args.first) * collectionsIds.length))

    if (args.after) queries.forEach(query => query.where('index', '<', args.after))
    if (args.before) queries.forEach(query => query.where('index', '>', args.before))

    let items = await Promise.all(queries)

    return collectionsIds.map((current, index) => {
      if (!items[index]) return []
      return orderBy(items[index], ['index'], ['desc'])
    })
  },

  async find({ limit, offset }) {
    const query = knex('items').select('*')

    if (limit) query.limit(limit)
    if (offset) query.offset(offset)

    return query
  },

  async count() {
    const [{ count }] = await knex('items').count()

    return count
  }
})
