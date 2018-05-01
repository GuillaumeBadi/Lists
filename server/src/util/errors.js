class APIError extends Error {
  constructor(
    status = 500,
    message = 'API Error',
    details
) {
    super(message)
    this.status = status
    this.details = this.details
  }

  serialize() {
    const dst = {
      status: this.status,
      message: this.message
    }

    if (this.details) {
      dst.details = this.details
    }

    return dst
  }
}

class BadRequest extends APIError {
  constructor(message = 'Bad request') {
    super(400, message)
  }
}
class Unauthorized extends APIError {
  constructor(message = 'Unauthorized you must be identified') {
    super(401, message)
  }
}
class Forbidden extends APIError {
  constructor(message = 'Access Denied') {
    super(403, message)
  }
}
class NotFound extends APIError {
  constructor(message = 'Resource not found') {
    super(404, message)
  }
}
class UnprocessableEntity extends APIError {
  constructor(message = 'Unprocessable entity') {
    super(422, message)
  }
}
class InternalServerError extends APIError {
  constructor(message = 'Internal Server Error') {
    super(500, message)
  }
}

function assert(value, message) {
  if (!value) {
    throw new UnprocessableEntity(message)
  }
}

module.exports = {
  APIError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  UnprocessableEntity,
  InternalServerError,
  assert,
}
