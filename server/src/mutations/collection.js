const knex = require('../drivers/knex')

module.exports = request => ({
  async create(payload) {
    const [collection] = await knex('collections')
      .insert(payload)
      .returning('*')

    return collection
  },
  async addItem(collection, itemPayload) {
    const [item] = await knex('items')
      .insert({ ...itemPayload, collectionId: collection.id })
      .returning('*')

    return item
  },
  async removeItem(collection, id) {
    await knex('items')
      .delete()
      .where({ id, collectionId: collection.id })
  }
})
