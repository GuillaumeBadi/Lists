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
import CollectionSettings from './containers/CollectionSettings'
import Page from './containers/Page'
import Settings from './containers/Settings'
import { setUsername } from './reducers/user'

const Layout = styled.View`
  flex: 1;
  background-color: white;
`

const Routes = new StackNavigator(
  {
    Page: { screen: Page },
    CollectionSettings: { screen: CollectionSettings },
    Settings: { screen: Settings },
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
      'CormorantGaramond-Semibold': require('./assets/fonts/Cormorant_Garamond/CormorantGaramond-SemiBold.ttf'),
      'CormorantGaramond-Bold': require('./assets/fonts/Cormorant_Garamond/CormorantGaramond-Bold.ttf'),
      'Garamond-Bold': require('./assets/fonts/EB_Garamond/EBGaramond-Bold.ttf'),
      'Garamond-ExtraBold': require('./assets/fonts/EB_Garamond/EBGaramond-ExtraBold.ttf'),
      'Garamond-Medium': require('./assets/fonts/EB_Garamond/EBGaramond-Medium.ttf'),
      'Garamond-Regular': require('./assets/fonts/EB_Garamond/EBGaramond-Regular.ttf'),
      'Garamond-SemiBold': require('./assets/fonts/EB_Garamond/EBGaramond-SemiBold.ttf'),
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
