import React, { Component } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

const Container = styled(Animated.View)`
  padding: 12px 24px;
  background-color: ${props => props.background || 'black'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const Message = styled.Text`
  color: ${props => props.color || 'white'};
  font-size: 13px;
`

class SnackBar extends Component {
  state = {
    active: false,
    offset: new Animated.Value(-50),
  }

  activate = () => {
    Animated.timing(this.state.offset, { toValue: 0 }).start()
  }

  deactivate = () => {
    Animated.timing(this.state.offset, { toValue: -50 }).start()
  }

  toggle = () => {
    const { active } = this.state
    if (active) {
      return this.deactivate()
    }
    return this.activate()
  }

  render() {
    const { color, background, message } = this.props

    return (
      <Container>
        <Message>{message}</Message>
      </Container>
    )
  }
}

export default SnackBar
