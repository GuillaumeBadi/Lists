import React, { Component } from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  width: 100%;
  padding: 32px 64px;
`

const Content = styled.Text`
  font-size: 24px;
  font-weight: 200;
  color: #424242;
`

class Hero extends Component {
  render() {
    const { title } = this.props

    return (
      <Container>
        <Content>{title}</Content>
      </Container>
    )
  }
}

export default Hero
