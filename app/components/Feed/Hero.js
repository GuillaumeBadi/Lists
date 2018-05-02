import React, { Component } from 'react'
import styled from 'styled-components'

import Icon from 'react-native-vector-icons/Ionicons'
import Picture from './Picture'

const Container = styled.View`
  width: 100%;
  padding: 16px 32px;
`

const TitleContainer = styled.View`
  flex-flow: row;
  align-items: flex-start;
  padding: 8px;
`

const Title = styled.Text`
  font-weight: 200;
  color: #424242;
  font-size: 24px;
`

const Content = styled.Text`
  font-size: 14px;
  color: #424242;
`

const TitleInfoContainer = styled.View`
  flex: 1;
  padding: 0 16px;
`

const Subscribers = styled.Text`
  font-size: 12px;
  color: #828282;
  margin: 8px 0;
`

class Hero extends Component {
  render() {
    return (
      <Container>
        <TitleContainer>
          <Picture
            source={{
              uri:
                'https://images.unsplash.com/photo-1506055306-3b99905bc598?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a0a26193477f9b61f28b23dc01b7eec2&auto=format&fit=crop&w=800&q=80',
            }}
          />
          <TitleInfoContainer>
            <Title>Daily House Plants</Title>
            <Content>
              A currated list of nice house plants articles and resources 🌿
            </Content>
            <Subscribers>500+ Subscribers</Subscribers>
          </TitleInfoContainer>
        </TitleContainer>
      </Container>
    )
  }
}

export default Hero
