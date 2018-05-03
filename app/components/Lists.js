import React, { Component } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

const Container = styled.View`
  flex: 1;
  padding-top: 64px;
`

const List = styled.ScrollView`
  width: 100%;
  flex: 1;
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

class Lists extends Component {
  openList = () => null

  createList = () => null

  render() {
    return (
      <Container>
        <List>
          <ItemContainer>
            <Title>Computer Science</Title>
          </ItemContainer>
          <ItemContainer>
            <Title>Computer Science</Title>
          </ItemContainer>
          <ItemContainer>
            <Title>Computer Science</Title>
          </ItemContainer>
          <ItemContainer>
            <Title>Computer Science</Title>
          </ItemContainer>
          <ItemContainer>
            <Title>Computer Science</Title>
          </ItemContainer>
          <ItemContainer>
            <Title>Computer Science</Title>
          </ItemContainer>
          <ItemContainer>
            <Icon name="md-add" color="#424242" size={25} />
          </ItemContainer>
        </List>
      </Container>
    )
  }
}

export default Lists
