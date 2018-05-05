const knex = require('../drivers/knex')

module.exports = context => ({
  async create(payload) {
    const [item] = await knex('items')
      .insert(payload)
      .returning('*')

    return item
  },
  async update(id, payload) {
    const [item] = await knex('items')
      .update(payload)
      .where({ id })
      .returning('*')

    return item
  },
  async delete(id) {
    const deleted = await knex('items')
      .delete()
      .where({ id })

    return deleted
  },
})
