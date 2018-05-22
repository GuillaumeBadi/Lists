import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from '../components/Form'

class Login extends Component {
  submit = results => {
    const { username } = results
    console.log(results)
    this.props.setUsername(username)
  }

  render() {
    const { navigation } = this.props

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
        onSubmit={this.submit}
      />
    )
  }
}

export default connect()(Login)
