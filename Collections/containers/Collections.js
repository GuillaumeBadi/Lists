import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CollectionsView from '../components/CollectionsView'
import Loading from '../components/Loading'
import { connect } from 'react-redux'

export const GET_COLLECTIONS = gql`
  query {
    viewer {
      username
      __typename
      collections {
        nodes {
          name
          description
          id
          __typename
        }
      }
    }
  }
`

class Collections extends Component {
  render() {
    const { navigation, collections, username } = this.props
    return (
      <Query query={GET_COLLECTIONS}>
        {({ data, loading, error }) => {
          if (loading) {
            return <Loading />
          }
          if (error) {
            console.log(error)
            return null
          }
          return (
            <CollectionsView
              {...this.props}
              username={data.viewer.username}
              collections={data.viewer.collections.nodes}
            />
          )
        }}
      </Query>
    )
  }
}

export default Collections
