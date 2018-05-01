const knex = require('../../src/drivers/knex')

async function mrCleaner() {
  try {
    await knex('items').delete()
    await knex('collections').delete()
    await knex('userSettings').delete()
    await knex('users').delete()
  } catch(err) {
    console.error(err)
    throw new Error('Mr Cleaner has problem')
  }
}

module.exports = mrCleaner
