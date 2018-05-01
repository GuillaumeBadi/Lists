const knex = require('../drivers/knex')

module.exports = request => ({
  async findById(id) {
    return knex('collections').select('*').where({ id }).first()
  },
  async find({ limit, offset }) {
    const query = knex('collections').select('*')

    if (limit) query.limit(limit)
    if (offset) query.offset(offset)

    return query
  },
  async count() {
    const [{ count }] = await knex('collections').count()

    return count
  }
})
