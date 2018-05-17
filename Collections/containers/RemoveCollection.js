import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { removeCollection } from '../reducers/collections'

class RemoveCollection extends Component {
  removeCollection = () => {
    this.props.dispatch(removeCollection(this.props.id))
  }

  render() {
    return (
      <Icon
        name="md-trash"
        color="white"
        size={20}
        onPress={this.removeCollection}
      />
    )
  }
}

export default connect()(RemoveCollection)
