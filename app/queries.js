import { gql } from 'apollo-boost'

export const signIn = gql`
  query signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      jwt
      id
      username
    }
  }
`

export const viewer = gql`
  query {
    viewer {
      id
      username
    }
  }
`

export const getCollectionItems = gql`
  query getCollectionItems($collectionId: Int!) {
    getCollectionItems {
      collection(id: $id) {
        id
      }
    }
  }
`

export const getUserCollections = gql`
  query {
    viewer {
      id
      collections {
        nodes {
          id
          name
          description
          createdAt
        }
      }
    }
  }
`
