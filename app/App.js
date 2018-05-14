import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import ShareMenu from 'react-native-share-menu'

import Root from './Root'

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

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    )
  }
}
