import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator color="#000" size="small" />
    </Container>
  )
}
