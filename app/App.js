import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Login from './components/Login'
import Feed from './components/Feed'
import Footer from './components/Footer'
import Header from './components/Feed/Header'

const View = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f7f7f8;
`

const client = new ApolloClient({ uri: 'localhost:3001/graphql' })

class Root extends Component {
  renderTabs = ({ activeTab, goToPage }) => {
    return <Footer onSelect={goToPage} index={activeTab} />
  }

  render() {
    return (
      <View>
        <StatusBar />
        <Header />
        <ScrollableTabView
          renderTabBar={this.renderTabs}
          prerenderingSiblingsNumber={1}
          tabBarPosition="bottom"
        >
          <Feed />
          <Feed />
        </ScrollableTabView>
      </View>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    )
  }
}
