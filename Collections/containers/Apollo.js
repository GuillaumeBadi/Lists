import React from 'react'
import { CachePersistor } from 'apollo-cache-persist'
import { AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { ApolloProvider as Provider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

const cache = new InMemoryCache({
  dataIdFromObject: defaultDataIdFromObject,
  addTypename: true,
})

let token
const withToken = setContext(async (_, { headers }) => {
  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: token,
      },
    }
  }
  token = await AsyncStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  }
})

const resetToken = onError(e => {
  console.log({ error: e })
  if (e.networkError && e.networkError.statusCode === 401) {
    token = null
  }
})

const authFlowLink = withToken.concat(resetToken)
const httpLink = createHttpLink({ uri: 'http://192.168.1.54:3001/graphql' })

const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
})

persistor.persist()

const client = new ApolloClient({
  link: authFlowLink.concat(httpLink),
  cache,
})

function ApolloProvider({ children }) {
  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
