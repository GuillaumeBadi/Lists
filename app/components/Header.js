import React, { Component } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import Icon from 'react-native-vector-icons/Ionicons'

const Container = styled.View`
  padding-top: 48px;
  padding-right: 48px;
  padding-left: 48px;
  padding-bottom: 24px;
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
`

class Header extends Component {
  render() {
    const {
      renderLeft = () => null,
      renderCenter = () => null,
      renderRight = () => null,
    } = this.props

    return (
      <Container>
        <View>{renderLeft()}</View>
        <View>{renderCenter()}</View>
        <View>{renderRight()}</View>
      </Container>
    )
  }
}

export default Header
