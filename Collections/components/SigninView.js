import React, { Component } from 'react'

import Form from '../components/Form'

class SigninView extends Component {
  render() {
    const { navigation, onSubmit } = this.props

    return (
      <Form
        displayHeader={false}
        title="Enter random values for now"
        description="Authentication is not plugged yet"
        navigation={navigation}
        fields={[
          { name: 'username', label: 'Username' },
          { name: 'password', label: 'Password' },
        ]}
        onSubmit={this.props.onSubmit}
      />
    )
  }
}

export default SigninView
