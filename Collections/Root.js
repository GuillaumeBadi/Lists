import React, { Component } from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'

import AppRoutes from './AppRoutes'

const Layout = styled.View`
  flex: 1;
  background-color: white;
`

class App extends Component {
  render() {
    return (
      <Layout>
        <StatusBar hidden />
        <AppRoutes />
      </Layout>
    )
  }
}

export default App
