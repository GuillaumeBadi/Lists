import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../components/Loading'

import LoginView from '../components/LoginView'
import Form from '../components/Form'

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $username: String!, $password: String!) {
    signup(username: $username, password: $password, email: $email) {
      username
      email
      jwt
    }
  }
`

class Login extends Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      return this.props.navigation.push('Routes')
    }
    this.setState({ loading: false })
  }

  render() {
    const { navigation } = this.props
    const { loading } = this.state

    if (loading) {
      return <Loading />
    }

    return <LoginView navigation={navigation} />
  }
}

export default Login
