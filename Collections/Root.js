import React, { Component } from 'react'
import styled from 'styled-components/native'
import { StackNavigator } from 'react-navigation'
import { StatusBar } from 'react-native'
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
  setUsername = username => {
    this.props.dispatch(setUsername(username))
  }

  render() {
    const { username } = this.props

    return (
      <Layout>
        <StatusBar hidden />
        {username ? <Routes /> : <Login setUsername={this.setUsername} />}
      </Layout>
    )
  }
}

export default connect(state => ({ username: state.user.username }))(App)
