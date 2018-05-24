import React, { Component } from 'react'

import Form from '../components/Form'

class SignupView extends Component {
  render() {
    const { navigation, onSubmit, error } = this.props

    return (
      <Form
        error={error}
        displayHeader={false}
        title="Enter random values for now"
        description="Authentication is not plugged yet"
        navigation={navigation}
        fields={[
          { name: 'email', label: 'Email' },
          { name: 'username', label: 'Username' },
          { name: 'password', label: 'Password' },
        ]}
        onSubmit={this.props.onSubmit}
      />
    )
  }
}

export default SignupView
