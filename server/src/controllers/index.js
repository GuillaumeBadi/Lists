const { Router } = require('express')

const router = Router()
  .use((req, res, next) => {
    res.send('hello')
  })
  .use((err, req, res, next) => {
    if (err.status) res.status(err.status)
    else res.status(500)

    if (err.identified) res.json(err.serialize())
    else res.json({ status: 500, type: 'Server error' })
  })

module.exports = router
