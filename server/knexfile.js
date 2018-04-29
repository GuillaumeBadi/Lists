
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'lists',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'dbMigrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'lists',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'dbMigrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'lists',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'dbMigrations'
    }
  }

}
