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

export const getUserCollections = gql`
  query {
    viewer {
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
