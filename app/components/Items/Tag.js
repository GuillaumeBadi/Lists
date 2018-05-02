import React, { Component } from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  padding: 4px 8px;
  background-color: ${props => props.color};
  border-radius: 5px;
  margin-right: 8px;
`

const Content = styled.Text`
  color: white;
  font-size: 10px;
`

class Tag extends Component {
  render() {
    const { children, color } = this.props
    return (
      <Container color={color}>
        <Content>{children}</Content>
      </Container>
    )
  }
}

export default Tag
