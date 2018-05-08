import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'
import CollectionsView from '../components/CollectionsView'

export const GET_COLLECTIONS = gql`
  {
    viewer {
      collections {
        nodes {
          id
          name
          description
        }
      }
    }
  }
`

class Collections extends Component {
  render() {
    const { navigation } = this.props

    return (
      <Query query={GET_COLLECTIONS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingScreen />
          }
          if (error) {
            return <ErrorScreen error={error} />
          }
          return (
            <CollectionsView
              navigation={navigation}
              collections={data.viewer.collections.nodes}
            />
          )
        }}
      </Query>
    )
  }
}

export default Collections
