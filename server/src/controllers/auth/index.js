const { Router } = require('express')
const errors = require('../../util/errors')

const SESSION = new Map()

const router = Router()

router
  .route('/auth')
  .post(createAuth)

function createAuth(req, res, next) {
  const id = puid.generate()

  SESSION.set(id, auth.email)

  res.json({})
}

function isAuthenticated(req, res, next) {

}

module.exports = {
  router
}
