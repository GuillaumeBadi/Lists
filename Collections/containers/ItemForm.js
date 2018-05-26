import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ItemFormView from '../components/ItemFormView'

import Loading from '../components/Loading'
import { GET_ITEMS } from './Items'

const CREATE_ITEM = gql`
  mutation createItem($collectionId: Int!, $type: String!, $value: String!) {
    addCollectionItem(collectionId: $collectionId, type: $type, value: $value) {
      __typename
      id
      value {
        ... on LinkItem {
          type
          url
        }
      }
    }
  }
`

class ItemForm extends Component {
  submit = createItem => async ({ url }) => {
    const collectionId = this.props.navigation.state.params.id
    await createItem({
      variables: {
        value: JSON.stringify({ url, index: 0, type: 'LINK' }),
        collectionId,
        type: 'LINK',
      },
    })
    this.props.navigation.pop()
  }

  render() {
    const { navigation } = this.props

    return (
      <Mutation
        mutation={CREATE_ITEM}
        refetchQueries={[
          {
            query: GET_ITEMS,
            variables: this.props.navigation.state.params.id,
          },
        ]}
      >
        {(createItem, { loading }) => {
          if (loading) {
            return <Loading />
          }
          return (
            <ItemFormView
              navigation={navigation}
              onSubmit={this.submit(createItem)}
            />
          )
        }}
      </Mutation>
    )
  }
}

export default ItemForm
