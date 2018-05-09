import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import Icon from 'react-native-vector-icons/Ionicons'

import { GET_COLLECTIONS } from './Collections'

const REMOVE_COLLECTION = gql`
  mutation removeCollection($id: ID!) {
    removeCollection(id: $id) {
      id
    }
  }
`

class RemoveCollection extends Component {
  removeCollection = removeCollection => () => {
    const { id, onPress } = this.props
    removeCollection({ variables: { id } })
    return onPress && onPress()
  }

  render() {
    const { id } = this.props

    return (
      <Mutation
        mutation={REMOVE_COLLECTION}
        update={cache => {
          const data = cache.readQuery({ query: GET_COLLECTIONS })
          const nodes = data.viewer.collections.nodes.filter(e => e.id !== id)

          data.viewer.collections.nodes = nodes

          return cache.writeQuery({ query: GET_COLLECTIONS, data })
        }}
      >
        {removeCollection => (
          <Icon
            name="md-delete"
            color="#424242"
            size={20}
            onPress={this.removeCollection(removeCollection)}
          />
        )}
      </Mutation>
    )
  }
}

export default RemoveCollection
