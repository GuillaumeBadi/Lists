import React from 'react'
import { StackNavigator } from 'react-navigation'
import Items from './containers/Items'
import ItemForm from './containers/ItemForm'
import Collections from './containers/Collections'
import CollectionForm from './containers/CollectionForm'
import CollectionSettings from './containers/CollectionSettings'
import Settings from './containers/Settings'
import Article from './components/Article'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Signin from './containers/Signin'

function App() {
  return <AppRoutes />
}

function Auth() {
  return <AuthRoutes />
}

const AppRoutes = new StackNavigator(
  {
    Auth: { getScreen: () => Auth },
    Page: { screen: Article },
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

const AuthRoutes = new StackNavigator(
  {
    Signup: { screen: Signup },
    Signin: { screen: Signin },
    Login: { screen: Login },
    Routes: { getScreen: () => App },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: { header: null },
  },
)

export default AuthRoutes
