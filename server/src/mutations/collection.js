const knex = require('../drivers/knex')

module.exports = context => ({
  async create(ownerId, payload) {
    const [collection] = await knex('collections')
      .insert({ ownerId, ...payload })
      .returning('*')

    return collection
  },
  async addItem(collection, { type, value }) {
    // make sure to insert the correct index
    const last = await knex('items')
      .where('collectionId', collection.id)
      .orderBy('index', 'DESC')
      .select('index')
      .first()

    const index = last ? last.index + 1 : 0

    const [item] = await knex('items')
      .insert({
        type,
        index,
        value,
        ownerId: context.user.id,
        collectionId: collection.id,
      })
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
