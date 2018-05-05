import { gql } from 'apollo-boost'

export const signIn = gql`
  query authenticate($username: String, $password: String) {
    user(username: $username, password: $password) {
      jwt
      id
      username
    }
  }
`

export const userCollections = gql`
  query {
    viewer {
      collections {
        name
        description
        index
      }
    }
  }
`
