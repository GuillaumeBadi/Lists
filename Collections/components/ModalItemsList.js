import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import ModalItem from './ModalItem'

import { addItem } from '../reducers/collections'

const Container = styled.View`
  height: 200px;
`

class ModalItemsList extends Component {
  addToCollection = id => () => {
    const { url } = this.props
    this.props.dispatch(addItem({ url, collectionId: id }))
    this.props.close()
  }

  render() {
    const { collections } = this.props
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

export default connect(state => ({
  collections: state.collections.list,
}))(ModalItemsList)
