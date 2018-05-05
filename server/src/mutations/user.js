const crypto = require('crypto')
const knex = require('../drivers/knex')
const { assert } = require('../util/errors')

const { SALT } = process.env

async function checkUsername(username) {
  assert(!!username, 'Field username is mandatory')

  const [{ count: countUsername }] = await knex('users')
    .where('username', username)
    .count()

  assert(Number(countUsername) === 0, 'Username already taken')
}

async function checkEmail(email) {
  assert(!!email, 'Field email is mandatory')

  const [{ count: countEmail }] = await knex('users')
    .where('email', email)
    .count()

  assert(Number(countEmail) === 0, 'Email already taken')
}

function checkPassword(password) {
  assert(!!password, 'Field password is mandatory')
  assert(password.length >= 6 && password.length < 25, 'Incorrect password lenght')
}

module.exports = request => ({
  async create(payload) {
    await Promise.all([
      checkUsername(payload.username),
      checkEmail(payload.email)
    ])
    checkPassword(payload.password)

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
  },
  async update(id, payload) {
    // TODO
  },
})
