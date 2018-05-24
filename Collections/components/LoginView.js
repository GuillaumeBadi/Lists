import React, { Component } from 'react'
import styled from 'styled-components/native'

import CTA from './CTA'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

class LoginView extends Component {
  render() {
    const { navigation } = this.props
    return (
      <Container>
        <CTA onPress={() => navigation.push('Signup')}>Create an account</CTA>
        <CTA outline onPress={() => navigation.push('Signin')}>
          Already have an account
        </CTA>
      </Container>
    )
  }
}

export default LoginView
