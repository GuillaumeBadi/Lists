import React, { Component } from 'react'
import { Animated, Dimensions } from 'react-native'
import styled from 'styled-components'

const { width, height } = Dimensions.get('window')

import Icon from 'react-native-vector-icons/Ionicons'

const Container = styled.View`width: 100%;`

const Item = styled.View`align-items: center;`

const Label = styled.Text`
  font-size: 12px;
  text-align: center;
`

const Elements = styled.View`
  width: 100%;
  padding: 12px 0;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
`

class NavigationBar extends Component {
  render() {
    return (
      <Container>
        <Elements>
          <Item>
            <Icon name="md-list" color="#424242" size={20} />
            <Label>Collections</Label>
          </Item>
          <Item>
            <Icon name="md-planet" color="#424242" size={20} />
            <Label>Discover</Label>
          </Item>
          <Item>
            <Icon name="ios-settings" color="#424242" size={20} />
            <Label>Settings</Label>
          </Item>
        </Elements>
      </Container>
    )
  }
}

export default NavigationBar
