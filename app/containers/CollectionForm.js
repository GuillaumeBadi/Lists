import React, { Component } from 'react'
import CollectionFormView from '../components/CollectionFormView'
import { connect } from 'react-redux'

import { addCollection } from '../reducers/collections'

class CollectionForm extends Component {
  submit = (name, description) => {
    this.props.dispatch(addCollection({ name, description }))
    this.props.navigation.pop()
  }

  render() {
    const { navigation } = this.props

    return <CollectionFormView navigation={navigation} onSubmit={this.submit} />
  }
}

export default connect()(CollectionForm)
