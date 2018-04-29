const { Router } = require('express')

const router = Router()
  .use((req, res, next) => {
    res.send('hello')
  })
  .use(error)

module.exports = router
