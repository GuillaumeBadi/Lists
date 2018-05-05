const crypto = require('crypto')
const knex = require('../drivers/knex')
const auth = require('../util/auth')

module.exports = request => ({
  async findById(id) {
    return knex('users').select('*').where({ id }).first()
  },
  async findByIds(ids) {
    const users = await knex('users').select('*').whereIn('id', ids)

    return ids.map(id => users.find(user => Number(user.id) === Number(id)))
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
  },
  async verify(username, password) {
    const hash = crypto.createHash('sha256')

    hash.update(SALT + password)

    const pass = hash.digest('hex')

    const user = await knex('users')
      .select('*')
      .where('username', username)
      .where('password', pass)
      .first()

    if (!user) {
      throw new Forbidden()
    }

    return auth.getAuthorization(user)
  }
})
