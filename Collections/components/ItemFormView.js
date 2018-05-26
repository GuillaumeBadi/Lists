import React, { Component } from 'react'

import Form from './Form'

class ItemFormView extends Component {
  render() {
    const { onSubmit } = this.props

    return (
      <Form
        title="Describe your new Item"
        description="Just an URL for now"
        navigation={this.props.navigation}
        fields={[{ name: 'url', label: 'Item Url' }]}
        onSubmit={onSubmit}
      />
    )
  }
}

export default ItemFormView
