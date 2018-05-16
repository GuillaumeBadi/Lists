import React from 'react'
import styled from 'styled-components/native'

import { Label } from './Text'

const Container = styled.View``

const TextField = styled.TextInput`
  border-bottom-width: 1;
  border-bottom-color: #424242;
  padding-top: 6px;
  padding-bottom: 6px;
  font-family: 'Garamond-Regular';
  font-size: 14px;
`

export default function Input({ type = 'username', label, ...props }) {
  const autoCapitalize = {
    email: 'none',
    name: 'words',
    description: 'sentences',
    username: 'none',
  }

  const autoCorrect = {
    email: false,
    name: false,
    description: true,
    username: false,
  }

  const keyboardType = {
    email: 'email-address',
  }

  return (
    <Container>
      <Label>{label}</Label>
      <TextField
        selectionColor="#ff9f02"
        returnKeyType="next"
        numberOfLines={type === 'description' ? 4 : 1}
        keyboardType={keyboardType[type] || 'default'}
        autoCapitalize={autoCapitalize[type]}
        autoCorrect={autoCorrect[type]}
        underlineColorAndroid="transparent"
        {...props}
      />
    </Container>
  )
}
