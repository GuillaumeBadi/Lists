import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  margin: 8px;
  width: 100%;
  min-height: 40px;
  flex-flow: row;
  justify-content: space-between;
  border: 1px solid #a0a0a0;
  border-radius: 5px;
`

const LabelContainer = styled.View`
  justify-content: center;
  align-items: center;
  border-right-width: 1;
  border-right-color: #a0a0a0;
  padding: 8px;
  min-width: 100px;
`

const Label = styled.Text``

const TextField = styled.TextInput`
  flex: 1;
  padding: 8px;
`

export default function Input({ label, ...props }) {
  return (
    <Container>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
      <TextField autoCorrect {...props} />
    </Container>
  )
}
