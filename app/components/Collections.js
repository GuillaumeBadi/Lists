import React, { Component } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

import CreateCollection from './CreateCollection'
import ListItem from './ListItem'

const Container = styled.View`
  background-color: #f7f7f8;
  flex: 1;
  padding-top: 64px;
  justify-content: center;
`

const ButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

const List = styled.ScrollView`
  width: 100%;
  flex: 1;
  background-color: #f7f7f8;
`

const ItemContainer = styled.View`
  width: 90%;
  border-radius: 5px;
  border-color: #f0f0f0;
  border-width: 1;
  padding: 8px 16px;
  margin: 8px;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: #424242;
`

class Collections extends Component {
  openList = () => null

  createCollection = () => {
    this.props.navigation.navigate('CollectionForm')
  }

  render() {
    console.log(this.props.navigation)
    return (
      <Container>
        <List>
          <ListItem author="guillaume" title="Computer Science" />
          <ButtonContainer onPress={this.createCollection}>
            <CreateCollection />
          </ButtonContainer>
        </List>
      </Container>
    )
  }
}

export default Collections
