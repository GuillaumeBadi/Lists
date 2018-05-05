import React, { Component } from 'react'
import styled from 'styled-components/native'

import Input from './Input'
import Button from './Button'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Form = styled.View`
  width: 500px;
`

class CollectionForm extends Component {
  render() {
    return (
      <Container>
        <Form>
          <Input label="Name" />
          <Button>Create</Button>
        </Form>
      </Container>
    )
  }
}

export default CollectionForm
