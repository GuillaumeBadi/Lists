import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import App from './App'
import Share from './share'

/*
 * Workaround to get Apollo Murtations working with 2.2.8
 */
Object.setPrototypeOf =
  Object.setPrototypeOf ||
  function(obj, proto) {
    obj.__proto__ = proto
    return obj
  }

console.disableYellowBox = true

AppRegistry.registerComponent('Collections', () => App)
AppRegistry.registerComponent('ShareCollection', () => () => <App share />)
