import React, { Component } from 'react'

import Form from './Form'

class CollectionFormView extends Component {
  render() {
    const { onSubmit } = this.props

    return (
      <Form
        title="Describe your collection"
        description="It will help us figure out what kind of content you would like us to save automatically for you"
        navigation={this.props.navigation}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'description', label: 'Description' },
        ]}
        onSubmit={onSubmit}
      />
    )
  }
}

export default CollectionFormView
