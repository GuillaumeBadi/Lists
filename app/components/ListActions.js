import React, { Component } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'

const ButtonContainer = styled.TouchableOpacity`
  background-color: #ff9f02;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 75px;
`

export class Button extends Component {
  render() {
    const { onPress, icon } = this.props
    return (
      <ButtonContainer onPress={onPress}>
        <Icon name={icon} size={20} color="white" />
      </ButtonContainer>
    )
  }
}
