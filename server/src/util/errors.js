class APIError extends Error {
  constructor(
    status = 500,
    message = 'API Error',
    details
) {
    super(message)
    this.status = status
  }

  serialize() {
    const dst = {
      status: this.status,
      message: this.message
    }

    if (this.details) {
      dst.details = this.details
    }

    return JSON.stringify(dst)
  }
}

class NotFoundError extends APIError {

}
