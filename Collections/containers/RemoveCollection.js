import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import Loading from '../components/Loading'
import { removeCollection } from '../reducers/collections'
import { GET_COLLECTIONS } from './Collections'

const REMOVE_COLLECTION = gql`
  mutation removeCollection($id: ID!) {
    removeCollection(id: $id) {
      __typename
      id
    }
  }
`

class RemoveCollection extends Component {
  removeCollection = removeCollection => () => {
    if (!this.props.id) {
      return console.error('No ID provided to delete collection')
    }
    removeCollection({ variables: { id: this.props.id } })
  }

  render() {
    const { children } = this.props
    return (
      <Mutation
        mutation={REMOVE_COLLECTION}
        update={(cache, { data: { removeCollection } }) => {
          const data = cache.readQuery({ query: GET_COLLECTIONS })
          data.viewer.collections.nodes = data.viewer.collections.nodes.filter(
            e => e.id !== this.props.id,
          )
          cache.writeQuery({ query: GET_COLLECTIONS, data })
        }}
      >
        {(removeCollection, { loading }) => {
          if (loading) {
            return <Loading />
          }
          return children(this.removeCollection(removeCollection))
        }}
      </Mutation>
    )
  }
}

export default RemoveCollection
