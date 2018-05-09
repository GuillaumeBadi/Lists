import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import { Subtitle } from './Text'
import styled from 'styled-components/native'

const Title = styled(Animated.Text)`
  font-family: 'Garamond-SemiBold';
  color: black;
  font-size: 16px;
`

const Container = styled(Animated.View)`
  padding-bottom: 24px;
  padding-right: 48px;
  padding-left: 48px;
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
`

class Header extends Component {
  state = {
    opacity: new Animated.Value(0),
    marginTop: new Animated.Value(-50),
    paddingTop: new Animated.Value(48),
  }

  componentDidUpdate(props) {
    if (props.displayTitle !== this.props.displayTitle) {
      if (this.props.displayTitle) {
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 300,
        }).start()
        Animated.timing(this.state.marginTop, {
          toValue: 0,
          duration: 300,
        }).start()
        Animated.timing(this.state.paddingTop, {
          toValue: 24,
          duration: 300,
        }).start()
      } else {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 300,
        }).start()
        Animated.timing(this.state.marginTop, {
          toValue: -50,
          duration: 300,
        }).start()
        Animated.timing(this.state.paddingTop, {
          toValue: 48,
          duration: 300,
        }).start()
      }
    }
  }

  render() {
    const {
      renderLeft = () => null,
      title = '',
      renderRight = () => null,
      displayTitle,
    } = this.props

    const { paddingTop, opacity, marginTop } = this.state

    return (
      <Container
        style={{ paddingTop }}
        displayTitle={displayTitle}
        onPress={this.toggle}
      >
        <View>{renderLeft()}</View>
        <View>
          <Title style={{ opacity, marginTop }}>{title}</Title>
        </View>
        <View>{renderRight()}</View>
      </Container>
    )
  }
}

export default Header
