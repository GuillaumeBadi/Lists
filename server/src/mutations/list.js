const knex = require('../drivers/knex')

module.exports = request => ({
  async create(payload) {
    const [list] = await knex('lists')
      .insert(payload)
      .returning('*')

    return list
  },
  async addItem(list, itemPayload) {
    const [item] = await knex('items')
      .insert({ ...itemPayload, listId: list.id })
      .returning('*')

    return item
  },
  async removeItem(list, id) {
    await knex('items')
      .delete()
      .where({ id, listId: list.id })
  }
})
