import React, { Component } from 'react'
import CollectionsView from '../components/CollectionsView'
import { connect } from 'react-redux'

class Collections extends Component {
  render() {
    const { collections, username } = this.props
    return (
      <CollectionsView
        {...this.props}
        username={username}
        collections={collections}
      />
    )
  }
}

export default connect(state => ({
  collections: state.collections.list,
  username: state.user.username,
}))(Collections)
