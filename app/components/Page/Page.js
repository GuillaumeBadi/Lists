import React, { Component } from 'react'
import styled from 'styled-components'

import Profile from '../Profile'
import Navigation from '../Navigation'

const Container = styled.View`
  width: 100%;
  height: 100%;
`

const Content = styled.View`
  background-color: #fcf9f7;
  flex: 1;
`

const profile = {
  name: 'Profile',
  component: Profile,
}

class Page extends Component {
  state = {
    navigation: 'profile',
  }

  changeNavigationItem = item => {
    this.setState({ navigation: item })
  }

  render() {
    return (
      <Container>
        <Content>
          <Router firstRoute={profile} />
        </Content>
        <Navigation
          onSelectItem={this.changeNavigationItem}
          active={this.state.navigation}
        />
      </Container>
    )
  }
}

export default Page
