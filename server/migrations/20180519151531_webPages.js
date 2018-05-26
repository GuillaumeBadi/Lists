exports.up = async function (knex, Promise) {
  await knex.schema.createTable('webPages', table => {
    table.increments().primary()

    table.string('url').unique()
    table.text('content')

    table.timestamp('refreshedAt').defaultTo(knex.fn.now())
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable('webPages')
}
