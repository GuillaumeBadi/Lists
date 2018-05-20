import React from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import Share from './share'

AppRegistry.registerComponent('Collections', () => App)
AppRegistry.registerComponent('ShareCollection', () => () => <App share />)
