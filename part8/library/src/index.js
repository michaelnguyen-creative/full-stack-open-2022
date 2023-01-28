import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
})
const authLink = setContext((req, { headers }) => {
  const token = localStorage.getItem('userToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
