import React, { Component } from 'react'
import styled from 'styled-components/native'

import Tag from './Tag'

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
`

const Container = styled.View``

const TagsList = styled.View`
  padding-top: 16px;
  flex-wrap: wrap;
  width: 100%;
  flex-flow: row;
`

const Wrapper = styled.View`
  flex-flow: row;
  padding: 24px 32px;
  width: 100%;
  background-color: white;
  border-color: #fafafa;
  border-width: 1;
`

class Article extends Component {
  render() {
    return (
      <Wrapper>
        <FaviconContainer>
          <Favicon
            source={{
              uri:
                'http://img.over-blog-kiwi.com/1/26/05/85/20150505/ob_cfa495_url.png',
            }}
          />
        </FaviconContainer>
        <Container>
          <Label>LeMonde.fr</Label>
          <Title>
            Le Bitcoin chute séverement apres une déclaration choc de Donald
            Trump
          </Title>
          <TagsList>
            <Tag color="#2275fa">news</Tag>
            <Tag color="#FC4371">start-up</Tag>
          </TagsList>
        </Container>
      </Wrapper>
    )
  }
}

export default Article
