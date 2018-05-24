import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Subtitle } from './Text'

const Container = styled.View`
  padding: 8px 24px;
  background-color: black;
  margin: 24px 0;
  justify-content: center;
  align-items: center;
  border-radius: 25px;

  ${props =>
    props.outline &&
    `
    background-color: transparent;
    border-width: 1;
    border-color: black;
  `};
`

const Text = styled(Subtitle)`
  color: white;

  ${props =>
    props.outline &&
    `
    color: black;
  `};
`

export default function CTA({ outline, children, onPress }) {
  return (
    <Container outline={outline}>
      <TouchableOpacity onPress={onPress}>
        <Text outline={outline}>{children}</Text>
      </TouchableOpacity>
    </Container>
  )
}
