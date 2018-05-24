import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../components/Loading'

import SignupView from '../components/SignupView'
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

class Signup extends Component {
  state = {
    loading: true,
    error: null,
  }

  submit = signup => async ({ email, username, password }) => {
    try {
      const result = await signup({ variables: { email, username, password } })
      await AsyncStorage.setItem('token', result.data.signup.jwt)
      this.props.navigation.push('Routes')
    } catch (e) {
      const error = e.graphQLErrors[0].message
      this.setState({ error })
    }
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

    return (
      <Mutation mutation={SIGNUP_MUTATION}>
        {signup => (
          <SignupView
            error={this.state.error}
            navigation={navigation}
            onSubmit={this.submit(signup)}
          />
        )}
      </Mutation>
    )
  }
}

export default Signup
