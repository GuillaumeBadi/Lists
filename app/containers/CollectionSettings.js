import React, { Component } from 'react'
import CollectionSettingsView from '../components/CollectionSettingsView'
import { connect } from 'react-redux'

import { updateCollection } from '../reducers/collections'

class CollectionSettings extends Component {
  submit = (name, description) => {
    this.props.dispatch(
      updateCollection({ ...this.props.collection, name, description }),
    )
    this.props.navigation.pop()
  }

  render() {
    const { navigation, collection } = this.props

    return (
      <CollectionSettingsView
        collection={collection}
        navigation={navigation}
        onSubmit={this.submit}
      />
    )
  }
}

export default connect((state, props) => ({
  collection: state.collections.list.find(
    e => e.id === props.navigation.state.params.id,
  ),
}))(CollectionSettings)
