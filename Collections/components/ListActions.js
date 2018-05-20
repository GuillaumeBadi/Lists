import React, { Component } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ButtonContainer = styled.TouchableOpacity`
  background-color: white;
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
        <Icon name={icon} size={20} color="#ff9f02" />
      </ButtonContainer>
    )
  }
}
