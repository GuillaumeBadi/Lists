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
    const { image, title, description, annotation } = this.props

    return (
      <Container>
        <TitleContainer>
          {image && <Picture source={{ uri: image }} />}
          <TitleInfoContainer>
            <Title>{title}</Title>
            {description && <Content>{description}</Content>}
            {annotation && <Subscribers>{annotation}</Subscribers>}
          </TitleInfoContainer>
        </TitleContainer>
      </Container>
    )
  }
}

export default Hero
