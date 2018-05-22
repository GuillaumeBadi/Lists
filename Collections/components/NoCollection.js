import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Subtitle, Description } from './Text'
import CTA from './CTA'

const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: -50px;
`

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const Desc = styled(Description)`
  text-align: center;
  width: auto;
`

class NoCollection extends Component {
  render() {
    return (
      <Wrapper>
        <Container>
          <Subtitle>It looks empty right ? 🤔</Subtitle>
          <Desc>Let's create your first collection</Desc>
          <CTA onPress={this.props.createCollection}>Create a collection</CTA>
        </Container>
      </Wrapper>
    )
  }
}

export default NoCollection
