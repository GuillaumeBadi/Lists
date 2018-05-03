const { Router } = require('express')
const pick = require('lodash.pick')

const knex = require('../drivers/knex')
const userMutation = require('../mutations/user')
const userSelector = require('../selectors/user')
const auth = require('../util/auth')
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
    if (!req.body.username || !req.body.password) {
      return next(new UnprocessableEntity(
        'Fields "username" and "password" are required'
      ))
    }
    const { username } = req.body

    const jwt = await userSelector(req).verify(username, password)

    return res.json({ jwt })
  } catch (err) {
    next(err)
  }
}

async function authenticate(req, res, next) {
  try {
    const token = req.get('Authorization') || req.query.jwt

    req.user = await auth.checkAuthorization(token)

    return next()
  } catch (err) {
    return err instanceof Forbidden
      ? next()
      : next(err)
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
