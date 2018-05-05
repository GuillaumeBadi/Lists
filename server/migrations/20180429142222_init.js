
exports.up = async function (knex, Promise) {
  await knex.schema.createTable('users', table => {
    table.increments().primary()

    table.string('username').unique()
    table.string('email').unique()
    table.boolean('emailVerified').defaultTo(false)
    table.string('pictureUrl')
    table.string('password')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('userSettings', table => {
    table.increments().primary()

    table.integer('userId')
    table.jsonb('settings')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())

    table.foreign('userId').references('id').inTable('users')
  })

  await knex.schema.createTable('collections', table => {
    table.increments().primary()

    table.boolean('public')
    table.integer('ownerId')
    table.string('name')
    table.text('description')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())

    table.foreign('ownerId').references('id').inTable('users')
  })

  await knex.schema.createTable('items', table => {
    table.increments().primary()

    table.integer('collectionId')
    table.integer('ownerId')

    table.integer('index')

    table.enum('type', [
      'COLLECTION',
      'URL',
      'CHECKABLE',
      'TEXT',
      'PICTURE'
    ])

    table.jsonb('value')

    table.string('cname')
    table.string('cid')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())

    table.foreign('collectionId').references('id').inTable('collections')
  })
}

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable('items')
  await knex.schema.dropTable('collections')
  await knex.schema.dropTable('userSettings')
  await knex.schema.dropTable('users')
}
