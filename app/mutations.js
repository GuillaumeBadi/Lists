import { gql } from 'apollo-boost'

export const signUp = gql`
  mutation signup($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      username
      id
      jwt
    }
  }
`

export const addCollectionItem = gql`
  mutation addCollectionItem(
    $collectionId: Int!
    $type: String!
    $value: String!
  ) {
    addCollectionItem(collectionId: $collectionId, type: $type, value: $value) {
      value
      id
    }
  }
`

export const createCollection = gql`
  mutation createCollection($name: String!, $description: String) {
    createCollection(name: $name, description: $description) {
      name
      createdAt
      description
    }
  }
`
