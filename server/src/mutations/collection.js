const knex = require('../drivers/knex')

module.exports = request => ({
  async create(ownerId, payload) {
    const [collection] = await knex('collections')
      .insert({ ownerId, ...payload })
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
  },
  async update(id, payload) {
    const [collection] = await knex('collections')
      .update(payload)
      .where({ id })
      .returning('*')

    return collection
  },
  async delete(id) {
    const deleted = await knex('collections')
      .delete()
      .where({ id })

    return deleted
  },
})
