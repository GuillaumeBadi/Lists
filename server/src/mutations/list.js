const knex = require('../drivers/knex')

module.exports = {
  async create(payload) {
    const [list] = await knex('lists').insert(payload).returning('*')

    return list
  }
}
