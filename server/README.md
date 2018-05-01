# Server

The server is based one Node.js 9.11.0 and implement a GraphQL API.

## File Structure

```
./src
  index.js          start file where we start the server, etc...
  app.js            definition of the express application

  controllers/      route definitions of the api
    index.js

  drivers/          Interfaces to access to third party services
                    like mysql / Facebook API / AWS ...

  graphql/          Graphql root schema and mutation definition
    index.js

    entity/         Graphql definition of "entity"
      index.js

  mutations/        All write operations on database.

  selectors/        All read operations on databases.

  util/             reusable functions
```

## Database

For now Lists only use postgreSQL.

## Routes

### Public

#### POST `/authenticate`

Create a JWT.

Example body:

```json
{
  "email": "something@poet.ic",
  "password": "something secret"
}
```

Example response:

```json
{
  "jwt": "ey..."
}
```

### Private

Private route require a header `Authorization` with a valid jwt.

#### ANY `/graphql`

Query the graphql API.
