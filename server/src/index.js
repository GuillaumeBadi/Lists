if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

require('./drivers/knex')

const app = require('./app')
const { onProcessHook } = require('./util/process')

const { HOST, PORT } = process.env

const server = app.listen(PORT, onStart)

function onStart(error) {
  if (error) {
    console.log('Start error')
    console.log(error)
    process.exit(1)
  }

  console.log(`server started on port: ${PORT}`)
  console.log(`Graphiql playground available at: http://${HOST}:${PORT}/graphiql`)
  onProcessHook(() => server.close())
}

onProcessHook((err) => {
  console.log(err)
  setTimeout(() => {
    console.error('Hard shutdown')
    process.exit(1)
  }, 100)
})
