import React, { Component } from 'react'
import styled from 'styled-components/native'

const Label = styled.Text`
  color: #c0c0c0;
  font-size: 12px;
  margin-bottom: 8px;
`

const Title = styled.Text`
  font-weight: 500;
  color: #424242;
  font-size: 16px;
`

const FaviconContainer = styled.View``

const Favicon = styled.Image`
  width: 15px;
  height: 15px;
  margin-right: 8px;
  margin-top: 2px;
  border-radius: ${15 / 2}px;
`

const Container = styled.View`
  justify-content: center;
  background-color: white;
  border-color: #fafafa;
  border-width: 1;
  border-radius: 5px;
  padding: 16px 32px;
  width: 90%;
  margin: 4px;
`

const Wrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`

const Description = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: 400;
  margin: 8px 0;
`

class ListItem extends Component {
  render() {
    const { title, author } = this.props

    return (
      <Wrapper>
        <Container>
          <Label>{author}</Label>
          <Title>{title}</Title>
        </Container>
      </Wrapper>
    )
  }
}

export default ListItem
