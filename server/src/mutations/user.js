const knex = require('../drivers/knex')
const crypto = require('crypto');

const { SALT } = process.env

module.exports = request => ({
  async create(payload) {
    const hash = crypto.createHash('sha256')

    hash.update(SALT + payload.password)

    const password = hash.digest('hex')
    const userPayload = {
      ...payload,
      password
    }
    const [user] = await knex('users')
      .insert(userPayload)
      .returning('*')

    return user
  }
})
