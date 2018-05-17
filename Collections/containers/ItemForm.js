import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemFormView from '../components/ItemFormView'

import { addItem } from '../reducers/collections'
import { getSource } from '../reducers/pages'

class ItemForm extends Component {
  submit = url => {
    const collectionId = this.props.navigation.state.params.id
    const domain = url.split('/')[2]
    const id = this.props.dispatch(addItem({ domain, url, collectionId }))
    this.props.dispatch(getSource(url, id))
    this.props.navigation.pop()
    this.props.navigation.navigate('Page', { id })
  }

  render() {
    const { navigation } = this.props
    const {
      state: {
        params: { id },
      },
    } = navigation

    return <ItemFormView navigation={navigation} onSubmit={this.submit} />
  }
}

export default connect()(ItemForm)
