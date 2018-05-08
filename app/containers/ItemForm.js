import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import ItemFormView from '../components/ItemFormView'

import { GET_COLLECTION_ITEMS } from './Items'

const ADD_COLLECTION_ITEM = gql`
  mutation addCollectionItem(
    $collectionId: Int!
    $type: String!
    $value: String!
  ) {
    addCollectionItem(collectionId: $collectionId, type: $type, value: $value) {
      __typename
      value {
        ... on LinkItem {
          url
        }
      }
      id
    }
  }
`

class ItemForm extends Component {
  submit = addCollectionItem => url => {
    addCollectionItem({
      variables: {
        value: JSON.stringify({ type: 'LINK', url }),
        collectionId: this.props.navigation.state.params.id,
        type: 'LINK',
      },
    })
    this.props.navigation.pop()
  }

  render() {
    const { navigation } = this.props
    const { state: { params: { id } } } = navigation

    return (
      <Mutation
        mutation={ADD_COLLECTION_ITEM}
        update={(cache, { data: { addCollectionItem } }) => {
          const data = cache.readQuery({
            query: GET_COLLECTION_ITEMS,
            variables: { id },
          })
          data.collection.items.nodes.unshift(addCollectionItem)
          cache.writeQuery({
            query: GET_COLLECTION_ITEMS,
            variables: { id },
            data,
          })
        }}
      >
        {addCollectionItem => {
          return (
            <ItemFormView
              navigation={navigation}
              onSubmit={this.submit(addCollectionItem)}
            />
          )
        }}
      </Mutation>
    )
  }
}

export default ItemForm
