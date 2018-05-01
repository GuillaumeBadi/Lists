const knex = require('../drivers/knex')

  module.exports = request => ({
    async findById(id) {
      return knex('items').select('*').where({ id }).first()
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
