import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { styled } from 'styled-components/native'
import { graphql, compose, ApolloConsumer } from 'react-apollo'

import { signUp } from '../mutations'
import { signIn, viewer } from '../queries'

class Auth extends Component {
  state = {
    loading: true,
    logged: false,
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token')
    return this.setState({ logged: !!token, loading: false })
  }

  signIn = client => async () => {
    const { data } = await client
      .query({ query: signIn, variables: { username, password } })
      .then(({ data: { signin: { jwt } } }) => {
        this.setState({ loading: true }, () => {
          AsyncStorage.setItem('token', jwt)
          this.setState({ loading: false, logged: true })
        })
      })
  }

  signUp = () => {
    const { username, email, password } = this.props
    if (!username || !email || !password) {
      console.error('missing parameters', username, email, password)
    }
    this.props
      .signUp({ variables: { email, password, username } })
      .then(({ data: { signup: { jwt } } }) => {
        this.setState({ loading: true }, () => {
          AsyncStorage.setItem('token', jwt)
          this.setState({ loading: false, logged: true })
        })
      })
      .catch(e => console.error(e))
  }

  signOut = async () => {
    this.setState({ loading: true })
    await AsyncStorage.clear()
    this.setState({ loading: false, logged: false })
  }

  render() {
    const { children } = this.props
    const { logged, loading } = this.state
    return (
      <ApolloConsumer>
        {client =>
          children({
            signIn: this.signIn(client),
            signUp: this.signUp,
            signOut: this.signOut,
            logged,
            loading,
          })
        }
      </ApolloConsumer>
    )
  }
}

export default graphql(viewer)(graphql(signUp, { name: 'signUp' })(Auth))
