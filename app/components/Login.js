import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
<<<<<<< HEAD
import styled from 'styled-components/native'

import { signUp } from '../mutations'
import { Button } from 'react-native'
=======
import { graphql, compose } from 'react-apollo'
import styled from 'styled-components/native'

import { signUp } from '../mutations'
import Button from './Button'
>>>>>>> 4fdb43b2a16aa9abf04cd49764da6c2ac0d36822
import Input from './Input'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Item = styled.View`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 16px;
`

class Login extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  update = field => value => {
    this.setState({ [field]: value }, () =>
      this.props.updateCredentials(this.state),
    )
  }

  signUp = () => {
    this.props.signUp()
  }

  signIn = () => {
    this.props.signIn()
  }

  render() {
    const { username, email, password } = this.state

    return (
      <Container>
        <Item>
          <Input
            label="Username"
            value={username}
            onChangeText={this.update('username')}
          />
          <Input
            label="Email"
            value={email}
            onChangeText={this.update('email')}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={this.update('password')}
          />
          <Button title="SignUp" onPress={this.signUp} />
        </Item>
        <Item>
          <Input
            label="Username"
            value={username}
            onChangeText={this.update('username')}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={this.update('password')}
          />
          <Button title="signIn" onPress={this.signIn} />
        </Item>
      </Container>
    )
  }
}

export default graphql(signUp)(Login)
