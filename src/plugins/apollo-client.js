import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'

import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

if (import.meta.env.DEV) {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}

const httpLink = createHttpLink({
  uri: 'https://spacex-production.up.railway.app/',
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
