const jwt = require('jsonwebtoken')

const knex = require('../drivers/knex')
const { Forbidden } = require('../util/errors')

const { JWT_SECRET } = process.env

function getAuthorization(user) {
  const jwtPayload = { email: user.email, name: user.username }

  return jwt.sign(jwtPayload, JWT_SECRET)
}

async function checkAuthorization(token) {
  if (!token) {
    throw new Forbidden()
  }

  let decoded

  try {
    decoded = jwt.verify(token, JWT_SECRET)
  } catch(err) {
    throw new Forbidden()
  }

  const user = await knex('users')
    .select('*')
    .where('name', decoded.username)
    .where('email', decoded.email)
    .first()

  if (!user) {
    throw new Forbidden()
  }

  return user
}

module.exports = {
  getAuthorization,
  checkAuthorization,
}
