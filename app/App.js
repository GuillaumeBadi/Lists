import React, { Component } from 'react'
import { Button } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import { StackNavigator } from 'react-navigation'

import Lists from './components/Lists'
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
  gotoLists = () => this.props.navigation.navigate('Lists')

  renderTabs = ({ activeTab, goToPage }) => {
    return <Footer onSelect={goToPage} index={activeTab} />
  }

  render() {
    return (
      <View>
        <Header />
        <ScrollableTabView
          renderTabBar={this.renderTabs}
          prerenderingSiblingsNumber={1}
          tabBarPosition="bottom"
        >
          <Feed />
          <Feed />
        </ScrollableTabView>
        <Button title="hello" color="#424242" onPress={this.gotoLists} />
      </View>
    )
  }
}

const Router = StackNavigator(
  {
    Home: { screen: Root },
    LogIn: { screen: Login },
    Lists: { screen: Lists },
  },
  {
    initialRouteName: 'LogIn',
    navigationOptions: {
      header: Header,
    },
  },
)

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View>
        <StatusBar hidden />
        <Router />
      </View>
    </ApolloProvider>
  )
}
