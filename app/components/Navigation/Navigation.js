import React, { Component } from 'react'
import styled from 'styled-components/native'

import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Container = styled.View`
  height: 50;
  width: 100%;
  background-color: white;
  border-top-color: #f0f0f0;
  border-top-width: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const Tab = styled(Icon)`padding: 16px;`

class Navigation extends Component {
  render() {
    const { active, onSelectItem } = this.props

    return (
      <Container>
        <Tab
          name="md-contacts"
          size={25}
          color={active === 'people' ? '#FF00D6' : '#424242'}
          onPress={() => onSelectItem('people')}
        />
        <Tab
          name="md-list-box"
          size={25}
          color={active === 'feed' ? '#FF00D6' : '#424242'}
          onPress={() => onSelectItem('feed')}
        />
        <Tab
          name="md-contact"
          size={25}
          color={active === 'profile' ? '#FF00D6' : '#424242'}
          onPress={() => onSelectItem('profile')}
        />
      </Container>
    )
  }
}

export default Navigation
