import React, { Component } from 'react'
import { AppState } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from 'react-native'
import storage from 'redux-persist/lib/storage'

import Root from './Root'
import Share from './share'

const config = {
  key: 'root',
  storage: storage,
}

function configureStore() {
  const store = createStore(
    persistReducer(config, reducers),
    applyMiddleware(thunk),
  )

  const persistor = persistStore(store)

  return { persistor, store }
}

const { store, persistor } = configureStore()

console.log('Store from App', { store: store.getState() })

export default class App extends Component {
  state = {
    appState: AppState.currentState,
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!', this.props)
      console.log({ persistor })
      persistor.persist()
    }
    this.setState({ appState: nextAppState })
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.props.share ? <Share /> : <Root />}
        </PersistGate>
      </Provider>
    )
  }
}
