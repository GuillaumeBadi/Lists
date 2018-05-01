const { Router } = require('express')
const crypto = require('crypto');
var jwt = require('jsonwebtoken')
const knex = require('../../drivers/knex')
const { UnprocessableEntity, Forbidden } = require('../../util/errors')

const { SALT, JWT_SECRET } = process.env

const router = Router()

router
  .route('/authenticate')
  .post(createAuth)

async function createAuth(req, res, next) {
  try {
    if (!req.body.email || !req.body.password) {
      return next(new UnprocessableEntity(
        'Fields "email" and "password" are required'
      ))
    }
    const { email } = req.body

    const hash = crypto.createHash('sha256')

    hash.update(SALT + req.body.password)

    const password = hash.digest('hex')

    const user = await knex('users')
      .select('*')
      .where({ email, password })
      .first()

    if (!user) return next(new Forbidden())

    const jwtPayload = { email: user.email, name: user.username }

    const token = jwt.sign(jwtPayload, JWT_SECRET)

    return res.json({ jwt: token })
  } catch (err) {
    next(err)
  }
}

async function authenticate(req, res, next) {
  try {
    const token = req.get('Authorization')
    let decoded

    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch(err) {
      return next(new Forbidden())
    }

    req.user = await knex('users')
      .select('*')
      .where('email', decoded.email)
      .first()

    if (!req.user) return next(new Forbidden())

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  router,
  authenticate
}
