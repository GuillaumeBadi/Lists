import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  width: 100%;
  padding: 16px;
  background-color: #2275fa;
  border-radius: 5px;
  margin: 8px;
  justify-content: center;
  align-items: center;
`

const Content = styled.Text`
  color: white;
  text-align: center;
`

export default function Button({ children, onPress }) {
  return (
    <Container onPress={onPress}>
      <Content>{children}</Content>
    </Container>
  )
}
