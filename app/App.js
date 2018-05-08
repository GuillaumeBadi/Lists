import React, { Component } from 'react'
import { Text, AsyncStorage } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { StackNavigator } from 'react-navigation'
import { Font } from 'expo'

import Collections from './containers/Collections'
import Items from './containers/Items'
import ItemForm from './containers/ItemForm'
import CollectionForm from './containers/CollectionForm'
import Login from './components/Login'

const View = styled.View`flex: 1;`

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

  render() {
    if (this.state.loaded) {
      return <Collections />
    } else {
      return <Text>Loading</Text>
    }
  }
}

const Router = StackNavigator(
  {
    Login: { screen: Login },
    Collections: { screen: Collections },
    CollectionForm: { screen: CollectionForm },
    Items: { screen: Items },
    ItemForm: { screen: ItemForm },
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
