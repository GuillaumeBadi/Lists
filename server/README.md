# Server

The server is based on Node.js 9.11.0 and implement a GraphQL API.

## Prerequisite

The server require to have a PostgreSQL server available.

## Quick start

1) Install dependencies `npm install`.
2) Update the `.env` file.
3) Run migrations `npm run migrate:up`.
4) Start the app with `npm run dev`.

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

# Authentification

## Signup

First create an account

```
mutation {
  register(
    username: "batman"
    email:"email@comic.dc"
    password: "000000"
  ) {
    username
    jwt
  }
}
```

## Signin

```
query {
  viewer {
    jwt
  }
  
  authenticate(
    username: "batman"
    password: "000000"
  ) {
    jwt
  }
}
```

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
