import React, { Component } from 'react'
import { Text, Button, AsyncStorage } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { StackNavigator } from 'react-navigation'
import { Font } from 'expo'

import ListItem from './components/ListItem'
import CollectionForm from './components/CollectionForm'
import Input from './components/Input'
import Collections from './components/Collections'
import Login from './components/Login'
import Feed from './components/Feed'
import Footer from './components/Footer'
import Header from './components/Feed/Header'
import Items from './components/Items'

const View = styled.View`
  flex: 1;
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
    if (this.state.loaded) {
      return <Collections />
      return (
        <ListItem
          title="House Plant Club"
          description="Discover a currated list of helpful articles to keep your house plants healthy"
        />
      )
    } else {
      return <Text>Loading</Text>
    }

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
    Login: { screen: Login },
    Collections: { screen: Collections },
    CollectionForm: { screen: CollectionForm },
    Items: { screen: Items },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      header: null,
    },
  },
)

export default class App extends Component {
  state = {
    loaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'CormorantGaramond-Semibold': require('./assets/fonts/Cormorant_Garamond/CormorantGaramond-SemiBold.ttf'),
      'CormorantGaramond-Bold': require('./assets/fonts/Cormorant_Garamond/CormorantGaramond-Bold.ttf'),
      'Garamond-Bold': require('./assets/fonts/EB_Garamond/EBGaramond-Bold.ttf'),
      'Garamond-BoldItalic': require('./assets/fonts/EB_Garamond/EBGaramond-BoldItalic.ttf'),
      'Garamond-ExtraBold': require('./assets/fonts/EB_Garamond/EBGaramond-ExtraBold.ttf'),
      'Garamond-ExtraBoldItalic': require('./assets/fonts/EB_Garamond/EBGaramond-ExtraBoldItalic.ttf'),
      'Garamond-Italic': require('./assets/fonts/EB_Garamond/EBGaramond-Italic.ttf'),
      'Garamond-Medium': require('./assets/fonts/EB_Garamond/EBGaramond-Medium.ttf'),
      'Garamond-MediumItalic': require('./assets/fonts/EB_Garamond/EBGaramond-MediumItalic.ttf'),
      'Garamond-Regular': require('./assets/fonts/EB_Garamond/EBGaramond-Regular.ttf'),
      'Garamond-SemiBold': require('./assets/fonts/EB_Garamond/EBGaramond-SemiBold.ttf'),
      'Garamond-SemiBoldItalic': require('./assets/fonts/EB_Garamond/EBGaramond-SemiBoldItalic.ttf'),
    })
    this.setState({ loaded: true })
  }

  render() {
    const { loaded } = this.state

    if (!loaded) {
      return null
    }

    return (
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    )
  }
}
