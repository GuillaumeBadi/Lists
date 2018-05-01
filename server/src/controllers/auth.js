const { Router } = require('express')
const crypto = require('crypto')
const pick = require('lodash.pick')

const knex = require('../drivers/knex')
const userMutation = require('../mutations/user')
const authUtil = require('../util/auth')
const { UnprocessableEntity, Forbidden } = require('../util/errors')

const { SALT } = process.env

const router = Router()

router
  .route('/authenticate')
  .post(createAuth)

router
  .route('/register')
  .post(createUser)

async function createAuth(req, res, next) {
  try {
    // Validate body
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

    const jwt = auth.getAuthorization(user)

    return res.json({ jwt })
  } catch (err) {
    next(err)
  }
}

async function authenticate(req, res, next) {
  try {
    const token = req.get('Authorization')

    req.user = await auth.checkAuthorization(token)

    return next()
  } catch (err) {
    return next(err)
  }
}

async function createUser(req, res, next) {
  try {
    const user = await userMutation(req).create(req.body)
    const cleanUser = pick(user, ['id', 'username', 'email'])

    res.status(201).json(cleanUser)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  router,
  authenticate
}
