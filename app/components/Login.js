import React, { Component } from 'react'
import { graphql, ApolloConsumer } from 'react-apollo'
import { AsyncStorage } from 'react-native'
import styled from 'styled-components/native'

import { signUp } from '../mutations'
import { signIn } from '../queries'
import { Button } from 'react-native'
import Input from './Input'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`

const Item = styled.View`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 16px;
`

class Login extends Component {
  state = {
    loading: true,
    username: '',
    email: '',
    password: '',
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      return this.props.navigation.navigate('Collections')
    } else {
      this.setState({ loading: false })
    }
  }

  update = field => value => {
    this.setState({ [field]: value })
  }

  signUp = async () => {
    const { username, email, password } = this.state
    const { data } = await this.props.signUp({
      variables: { email, password, username },
    })
    await AsyncStorage.setItem('token', data.signup.jwt)
    this.props.navigation.push('Collections')
  }

  signIn = client => async () => {
    const { username, password } = this.state
    const { data } = await client.query({
      query: signIn,
      variables: { username, password },
    })
    await AsyncStorage.setItem('token', data.signin.jwt)
    this.props.navigation.push('Collections')
  }

  render() {
    const { username, email, password, loading } = this.state

    if (loading) {
      return null
    }

    return (
      <ApolloConsumer>
        {client => (
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
              <Button title="signIn" onPress={this.signIn(client)} />
            </Item>
          </Container>
        )}
      </ApolloConsumer>
    )
  }
}

export default graphql(signUp, { name: 'signUp' })(Login)
