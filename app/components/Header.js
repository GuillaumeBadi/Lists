import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'
import { Subtitle } from './Text'
import styled from 'styled-components/native'

import config from '../config'

const Title = styled.Text`
  font-family: 'Quicksand-Medium';
  color: black;
  font-size: 14px;
  color: ${config.header.iconColor};
`

const Container = styled.View`
  background-color: ${config.header.color};
  padding-right: 24px;
  padding-left: 24px;
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
`

class Header extends Component {
  render() {
    const {
      renderLeft = () => null,
      title = '',
      renderRight = () => null,
    } = this.props

    return (
      <Container>
        <View>{renderLeft()}</View>
        <View>
          <Title>{title}</Title>
        </View>
        <View>{renderRight()}</View>
      </Container>
    )
  }
}

export default Header
