import React, { Component } from 'react'
import { Button } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import Content from '../components/Content'
import Input from '../components/Input'

const Layout = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`

class Login extends Component {
  state = { username: '' }

  submit = () => {
    this.props.setUsername(this.state.username)
  }

  render() {
    const { username } = this.state

    return (
      <Layout>
        <Content>
          <Input
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />
          <Button onPress={this.submit} title="Submit" color="#424242" />
        </Content>
      </Layout>
    )
  }
}

export default connect()(Login)
