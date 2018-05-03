import React, { Component } from 'react'
import { Button } from 'react-native'
import styled from 'styled-components/native'

const HEADER_SIZE = 64

const Container = styled.View`
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  background-color: ${props => props.color};
  top: ${HEADER_SIZE};
  left: 0;
  right: 0;
  padding: 8px 16px;
`

const Message = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
`

const notificationTypes = {
  error: { color: 'red', message: 'An error has occured' },
  saving: { color: 'rgba(0,0,0,0.5)', message: 'Saving content ...' },
}

export default function Notification({ type = 'error' }) {
  const { color, message } = notificationTypes[type]

  return (
    <Container color={color}>
      <Message>{message}</Message>
      <Button color="white" title="Undo" onPress={() => null} />
    </Container>
  )
}
