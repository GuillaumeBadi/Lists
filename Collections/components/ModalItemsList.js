import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import ModalItem from './ModalItem'

import { addItem } from '../reducers/collections'

const Container = styled.View`
  height: 200px;
`

class ModalItemsList extends Component {
  addToCollection = id => () => {}

  render() {
    const { collections = [] } = this.props
    return (
      <Container>
        <ScrollView>
          {collections.map(c => (
            <ModalItem
              key={c.id}
              name={c.name}
              onPress={this.addToCollection(c.id)}
            />
          ))}
        </ScrollView>
      </Container>
    )
  }
}

export default ModalItemsList
