
exports.up = async function (knex, Promise) {
  await knex.schema.createTable('users', table => {
    table.increments().primary()

    table.string('username').unique()
    table.string('email').unique()
    table.string('pictureUrl')
    table.string('password')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('userSettings', table => {
    table.increments().primary()

    table.integer('userId')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())

    table.foreign('userId').references('id').inTable('users')
  })

  await knex.schema.createTable('lists', table => {
    table.increments().primary()

    table.integer('userId')
    table.string('name')
    table.text('description')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())

    table.foreign('userId').references('id').inTable('users')
  })

  await knex.schema.createTable('items', table => {
    table.increments().primary()

    table.integer('listId')

    table.integer('index')

    table.enum('type', [
      'LIST',
      'URL',
      'CHECKABLE',
      'TEXT',
      'PICTURE'
    ])

    table.jsonb('value')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())

    table.foreign('listId').references('id').inTable('lists')
  })
}

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable('items')
  await knex.schema.dropTable('lists')
  await knex.schema.dropTable('userSettings')
  await knex.schema.dropTable('users')
}
