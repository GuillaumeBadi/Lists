import React, { Component } from 'react'
import styled from 'styled-components/native'

import { AuthSession } from 'expo'

import { Button } from 'react-native'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Label = styled.Text``

const Item = styled.View`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 8px;
`

const Input = styled.TextInput`
  border-radius: 5px;
  background-color: #f0f0f0;
  padding: 4px;
  min-width: 200px;
`

class Login extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  update = field => ({ e: { target: { value } } }) => {
    this.setState({ [field]: value })
  }

  render() {
    const { username, email, password } = this.state

    return (
      <Container>
        <Item>
          <Item>
            <Label>Username</Label>
            <Input value={username} onPress={this.update('username')} />
          </Item>
          <Item>
            <Label>Email</Label>
            <Input value={email} onPress={this.update('email')} />
          </Item>
          <Item>
            <Label>Password</Label>
            <Input value={email} onPress={this.update('password')} />
          </Item>
          <Item>
            <Button color="#2275fa" title="SignUp" onPress={() => null} />
          </Item>
        </Item>
        <Item>
          <Item>
            <Label>Username</Label>
            <Input value={username} onPress={this.update('username')} />
          </Item>
          <Item>
            <Label>Password</Label>
            <Input value={email} onPress={this.update('password')} />
          </Item>
          <Item>
            <Button color="#2275fa" title="SignIn" onPress={() => null} />
          </Item>
        </Item>
      </Container>
    )
  }
}

export default Login
