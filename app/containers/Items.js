import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'
import ItemsView from '../components/ItemsView'

export const GET_COLLECTION_ITEMS = gql`
  query getCollectionItems($id: Int!) {
    collection(id: $id) {
      name
      description
      id
      items {
        nodes {
          id
          value {
            ... on LinkItem {
              url
            }
          }
        }
      }
    }
  }
`

class Items extends Component {
  render() {
    const { navigation } = this.props
    const { state: { params: { id } } } = navigation

    return (
      <Query query={GET_COLLECTION_ITEMS} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingScreen />
          }
          if (error) {
            return <ErrorScreen error={error} />
          }
          return (
            <ItemsView
              name={data.collection.name}
              description={data.collection.description}
              collectionId={id}
              navigation={navigation}
              items={data.collection.items.nodes}
            />
          )
        }}
      </Query>
    )
  }
}

export default Items
