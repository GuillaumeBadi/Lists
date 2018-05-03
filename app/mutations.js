import { gql } from 'apollo-boost'

export const signIn = gql`
  mutation createUser($email: String, $username: String, $password: String) {
    createUser(email: $email, username: $username, password: $password) {
      username
      id
      jwt
    }
  }
`

export const createCollection = gql`
  mutation createCollection(
    $name: String
    $description: String
    $owner: String
  ) {
    createCollection(name: $name, description: $description, owner: $owner) {
      id
      name
      description
    }
  }
`
