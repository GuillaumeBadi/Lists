const knex = require('../drivers/knex')

module.exports = {
  async findById(id) {
    return knex('users').select('*').where({ id }).first()
  },
  async find({ limit, offset }) {
    const query = knex('users').select('*')

    if (limit) query.limit(limit)
    if (offset) query.offset(offset)

    return query
  },
  async count() {
    const [{ count }] = await knex('users').count()

    return count
  }
}
