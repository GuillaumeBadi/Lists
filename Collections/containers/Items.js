import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemsView from '../components/ItemsView'

import { removeItem } from '../reducers/collections'

class Items extends Component {
  removeItem = id => {
    this.props.dispatch(removeItem(id))
  }

  render() {
    const { navigation, collection, items } = this.props

    return (
      <ItemsView
        removeItem={this.removeItem}
        name={collection.name}
        description={collection.description}
        collectionId={collection.id}
        navigation={navigation}
        items={items}
      />
    )
  }
}

export default connect(
  (
    state,
    {
      navigation: {
        state: {
          params: { id },
        },
      },
    },
  ) => ({
    collection: state.collections.list.find(e => e.id === id),
    items: state.collections.items.filter(e => e.collectionId === id),
  }),
)(Items)
