import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import ItemsView from '../components/ItemsView'
import { removeItem } from '../reducers/collections'

import Loading from '../components/Loading'

export const GET_ITEMS = gql`
  query getItems($collectionId: Int!) {
    collection(id: $collectionId) {
      id
      name
      description
      __typename
      items {
        nodes {
          type
          id
          __typename
          value {
            ... on LinkItem {
              type
              url
            }
          }
        }
      }
    }
  }
`

class Items extends Component {
  removeItem = id => {
    this.props.dispatch(removeItem(id))
  }

  render() {
    const { navigation } = this.props

    return (
      <Query
        query={GET_ITEMS}
        variables={{ collectionId: navigation.state.params.id }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <Loading />
          }
          if (error) {
            console.log(error)
            return null
          }
          console.log(data)
          return (
            <ItemsView
              removeItem={this.removeItem}
              name={data.collection.name}
              description={data.collection.description}
              collectionId={data.collection.id}
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
