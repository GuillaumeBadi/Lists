const knex = require('../drivers/knex')

  module.exports = request => ({
    async findById(id) {
      return knex('items').select('*').where({ id }).first()
    },

    async findByIds(ids) {
      const items = await knex('items').select('*').whereIn('id', ids)

      return ids.map(id => items.find(item => Number(item.id) === Number(id)))
    },

    async findByCollections(collectionIds) {
      const items = await knex('items')
        .select('*')
        .whereIn('collectionId', collectionIds)

      const itemsByCollection = groupBy(items, 'collectionId')

      return collectionIds.map(collectionId => itemsByCollection[collectionId] || [])
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
