import React, { Component } from 'react'
import styled from 'styled-components/native'

import CTA from './CTA'

import Form from './Form'

const Container = styled.View`
  flex: 1;
  justify-content: center;
`

const CTAContainer = styled.View`
  justify-content: center;
  padding: 12px;
  background: white;
`

class SettingsView extends Component {
  render() {
    const { onSubmit, logout } = this.props

    return (
      <Container>
        <Form
          title="Update your personal informations"
          description="We use your data to provide a smoother experience"
          navigation={this.props.navigation}
          fields={[{ name: 'username', label: 'Username' }]}
          onSubmit={onSubmit}
        />
        <CTAContainer>
          <CTA onPress={logout}>Logout</CTA>
        </CTAContainer>
      </Container>
    )
  }
}

export default SettingsView
