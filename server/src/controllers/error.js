const { APIError } = require('../util/error')

function errorMiddleware(err, req, res, next) {
  let error

  if (err instanceof APIError) {
    res.status(err.status)
    error = err.serialize()
  } else {
    res.status(500)
    error = { status: 500, type: 'Server error' }
  }

  // logging goes here

  res.json(error)
}

module.exports = errorMiddleware
