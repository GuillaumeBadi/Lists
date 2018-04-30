require('dotenv').config()

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

require('./drivers/knex')

const app = require('./app')
const { onProcessHook } = require('./util/process')

const { PORT } = process.env

const server = app.listen(PORT, onStart)

function onStart() {
  console.log(`server started on port: ${PORT}`)
  onProcessHook(() => {
    server.close()
  })
}

onProcessHook(() => {
  setTimeout(() => {
    console.error('Hard shutdown')
    process.exit(1)
  }, 100)
})
