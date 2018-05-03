import { gql } from 'apollo-boost'

const signIn = gql`
  query auth($username: String, $password: String) {
    user(username: $username, password: $password) {
      jwt
      id
      username
    }
  }
`

const userCollections = gql`
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
