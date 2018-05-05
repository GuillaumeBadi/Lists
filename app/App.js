import React, { Component } from 'react'
import { Text, Button, AsyncStorage } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { StackNavigator } from 'react-navigation'

import CollectionForm from './components/CollectionForm'
import Input from './components/Input'
import Auth from './components/Auth'
import Collections from './components/Collections'
import Input from './components/Input'
import Auth from './components/Auth'
import Lists from './components/Lists'
import Login from './components/Login'
import Feed from './components/Feed'
import Footer from './components/Footer'
import Header from './components/Feed/Header'

const View = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f7f7f8;
  justify-content: center;
  align-items: center;
`

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  async request(operation) {
    return operation.setContext({
      headers: {
        Authorization: await AsyncStorage.getItem('token'),
      },
    })
  },
})

class Root extends Component {
  gotoLists = () => this.props.navigation.navigate('Collections')

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
    Collections: { screen: Collections },
    CollectionForm: { screen: CollectionForm },
  },
  {
    initialRouteName: 'Home',
    // navigationOptions: {
    // header: Header,
    // },
  },
)

export default class App extends Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  updateCredentials = ({ username, password, email }) => {
    this.setState({ username, password, email })
  }

  renderLogged = ({ signOut }) => {
    return <Router />
  }

  render() {
    const { username, password, email } = this.state
    return (
      <ApolloProvider client={client}>
        <Auth username={username} password={password} email={email}>
          {({ loading, signOut, signIn, signUp, logged }) => (
            <View>
              <StatusBar hidden />
              {loading && <Text>Loading</Text>}
              {logged && this.renderLogged({ signOut })}
              {!logged &&
                !loading && (
                  <Login
                    signIn={signIn}
                    signUp={signUp}
                    updateCredentials={this.updateCredentials}
                  />
                )}
            </View>
          )}
        </Auth>
      </ApolloProvider>
    )
  }
}
