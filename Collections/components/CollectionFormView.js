import React, { Component } from 'react'
import styled from 'styled-components/native'

import Icon from './HeaderIcon'
import Input from './Input'

import SectionTitle from './SectionTitle'
import { Description } from './Text'
import Content from './Content'
import Header from './Header'

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
