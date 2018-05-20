import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

import { Subtitle } from './Text'

const Container = styled.View`
  padding: 6px 0;
  width: 100%;
`

class ModalItem extends Component {
  render() {
    const { name, onPress } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <Container>
          <Subtitle>{name}</Subtitle>
        </Container>
      </TouchableOpacity>
    )
  }
}

export default ModalItem
