import React, { Component } from 'react'
import styled from 'styled-components/native'

import { AuthSession } from 'expo'

import { Button } from 'react-native'

const FB_APP_ID = '2033479680240001'

const Container = styled.View`
  flex: 1;
  background-color: #f7f7f8;
`

class Login extends Component {
  state = {
    result: null,
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl()
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    })
    this.setState({ result })
  }

  render() {
    return (
      <Container>
        <Button
          title="Connect with Facebook"
          onPress={this._handlePressAsync}
        />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
      </Container>
    )
  }
}

export default Login
