import React, { Component } from 'react'
import styled from 'styled-components/native'
import { StackNavigator } from 'react-navigation'
import { StatusBar } from 'react-native'
import { Font } from 'expo'
import { connect } from 'react-redux'
import Login from './containers/Login'
import Items from './containers/Items'
import ItemForm from './containers/ItemForm'
import Collections from './containers/Collections'
import CollectionForm from './containers/CollectionForm'
import Page from './containers/Page'
import { setUsername } from './reducers/user'

const Layout = styled.View`flex: 1; background-color: white;`

const Routes = new StackNavigator(
  {
    Page: { screen: Page },
    Items: { screen: Items },
    ItemForm: { screen: ItemForm },
    Collections: { screen: Collections, path: 'collections' },
    CollectionForm: { screen: CollectionForm, path: 'collections/new' },
  },
  {
    initialRouteName: 'Collections',
    navigationOptions: { header: null },
  },
)

class App extends Component {
  state = {
    loaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Quicksand-Regular': require('./assets/fonts/Quicksand/Quicksand-Regular.ttf'),
      'Quicksand-Medium': require('./assets/fonts/Quicksand/Quicksand-Medium.ttf'),
      'Quicksand-Bold': require('./assets/fonts/Quicksand/Quicksand-Bold.ttf'),
      'Quicksand-Light': require('./assets/fonts/Quicksand/Quicksand-Light.ttf'),
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

  setUsername = username => {
    this.props.dispatch(setUsername(username))
  }

  render() {
    const { loaded } = this.state
    const { username } = this.props

    if (!loaded) {
      return null
    }

    return (
      <Layout>
        <StatusBar hidden />
        {username ? <Routes /> : <Login setUsername={this.setUsername} />}
      </Layout>
    )
  }
}

export default connect(state => ({ username: state.user.username }))(App)
