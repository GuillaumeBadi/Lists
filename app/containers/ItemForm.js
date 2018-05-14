import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemFormView from '../components/ItemFormView'

import { addCollectionItem } from '../reducers/collections'

class ItemForm extends Component {
  submit = url => {
    const collectionId = this.props.navigation.state.params.id
    const domainLimit = url.indexOf('/') || url.length
    const domain = url.slice(domainLimit)
    this.props.dispatch(
      addCollectionItem({
        domain,
        url,
        collectionId: collectionId,
      }),
    )
    this.props.navigation.pop()
    this.props.navigation.navigate('Page', { url, collectionId })
  }

  render() {
    const { navigation } = this.props
    const { state: { params: { id } } } = navigation

    return <ItemFormView navigation={navigation} onSubmit={this.submit} />
  }
}

export default connect()(ItemForm)
