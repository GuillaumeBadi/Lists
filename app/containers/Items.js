import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemsView from '../components/ItemsView'

import { removeItem } from '../reducers/collections'

class Items extends Component {
  removeItem = url => {
    this.props.dispatch(
      removeItem({ url, collectionId: this.props.collection.name }),
    )
  }

  render() {
    const { navigation, collection } = this.props
    const { state: { params: { id } } } = navigation

    return (
      <ItemsView
        removeItem={this.removeItem}
        name={collection.name}
        description={collection.description}
        collectionId={id}
        navigation={navigation}
        items={collection.items}
      />
    )
  }
}

export default connect(
  (state, { navigation: { state: { params: { id } } } }) => ({
    collection: state.collections.list.find(e => e.name === id) || [],
  }),
)(Items)
