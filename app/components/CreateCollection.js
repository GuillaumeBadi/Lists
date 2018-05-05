import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

const Container = styled.View`
  width: 90%;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  background-color: #2275fa;
  margin: 4px;
  border-radius: 5px;
`

export default function CreateCollection({ onPress }) {
  return (
    <Container>
      <Icon name="md-add" size={20} color="white" />
    </Container>
  )
}
