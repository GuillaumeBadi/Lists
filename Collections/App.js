import React, { Component } from 'react'
import ApolloProvider from './containers/Apollo'
import { AsyncStorage } from 'react-native'
import { Text } from 'react-native'

import Root from './Root'
import Share from './share'

export default class App extends Component {
  render() {
    return (
      <ApolloProvider>{this.props.share ? <Share /> : <Root />}</ApolloProvider>
    )
  }
}
