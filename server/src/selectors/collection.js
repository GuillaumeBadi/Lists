const knex = require('../drivers/knex')

module.exports = context => ({
  async findById(id) {
    return knex('collections').select('*').where({ id }).first()
  },


  async findByIds(ids) {
    const collections = await knex('collections').select('*').whereIn({ ids })

    return ids.map(id => collections.find(collection => collection.id === id))
  },

  async findByOwnerId(ownerId) {
    const collections = await knex('collections').select('*').where({ ownerId })

    return ids.map(id => collections.find(collection => collection.id === id))
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
