import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../components/Loading'

import SigninView from '../components/SigninView'
import Form from '../components/Form'

const SIGNIN_MUTATION = gql`
  mutation signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      username
      jwt
    }
  }
`

class Signin extends Component {
  state = {
    loading: true,
  }

  submit = signin => async ({ username, password }) => {
    try {
      const result = await signin({ variables: { username, password } })
      await AsyncStorage.setItem('token', result.data.signin.jwt)
      this.props.navigation.push('Routes')
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { navigation } = this.props
    const { loading } = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <Mutation mutation={SIGNIN_MUTATION}>
        {signup => (
          <SigninView navigation={navigation} onSubmit={this.submit(signin)} />
        )}
      </Mutation>
    )
  }
}

export default Signin
