import React from 'react'
import styled from 'styled-components/native'

import { Label } from './Text'

const Container = styled.View``

const TextField = styled.TextInput`
  border-bottom-width: 1;
  border-bottom-color: #424242;
  padding-top: 6px;
  padding-bottom: 6px;
  font-family: 'Quicksand-Regular';
  font-size: 14px;
`

export default function Input({ label, ...props }) {
  return (
    <Container>
      <Label>{label}</Label>
      <TextField underlineColorAndroid="transparent" autoCorrect {...props} />
    </Container>
  )
}
