import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import Loading from '../components/Loading'
import { GET_ITEMS } from './Items'

const REMOVE_ITEM = gql`
  mutation remove($id: ID!) {
    removeItem(id: $id) {
      __typename
      id
    }
  }
`

export default function removeItem(collectionId) {
  return class RemoveItem extends Component {
    removeItem = remove => () => {
      if (!this.props.id) {
        return console.error('No ID provided to delete item')
      }
      remove({ variables: { id: this.props.id } })
    }

    render() {
      const { children } = this.props
      return (
        <Mutation
          mutation={REMOVE_ITEM}
          update={(cache, { data: { removeItem } }) => {
            const data = cache.readQuery({
              query: GET_ITEMS,
              variables: { collectionId },
            })
            console.log(data.collection)
            data.collection.items.nodes = data.collection.items.nodes.filter(
              e => e.id !== this.props.id,
            )
            cache.writeQuery({
              query: GET_ITEMS,
              data,
              variables: { collectionId },
            })
          }}
        >
          {(remove, { loading }) => {
            if (loading) {
              return <Loading />
            }
            return children(this.removeItem(remove))
          }}
        </Mutation>
      )
    }
  }
}
