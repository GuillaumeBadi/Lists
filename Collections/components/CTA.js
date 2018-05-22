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
`

const Text = styled(Subtitle)`
  color: white;
`

export default function CTA({ children, onPress }) {
  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </Container>
  )
}
