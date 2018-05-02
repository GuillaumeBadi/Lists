import React, { Component } from 'react'
import styled from 'styled-components/native'

import Picture from './Picture'
import Username from './Username'
import Hero from './Hero'
import Article from '../Items/Article'
import Recommendation from '../Items/Recommendation'

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f7f7f8;
`

const ListWrapper = styled.View`
  width: 100%;
  flex: 1;
`

const List = styled.ScrollView`
  width: 100%;
  flex: 1;
`

class Feed extends Component {
  render() {
    return (
      <Container>
        <ListWrapper>
          <List>
            <Hero />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Recommendation />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Article />
            <Recommendation />
            <Article />
          </List>
        </ListWrapper>
      </Container>
    )
  }
}

export default Feed
