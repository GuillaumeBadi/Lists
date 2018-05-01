const { NotFound, APIError } = require('../util/errors')

function notFoundMiddleware(req, res, next) {
  next(new NotFound())
}

function errorMiddleware(err, req, res, next) {
  let error

  console.log(err)

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

module.exports = { notFoundMiddleware, errorMiddleware }
