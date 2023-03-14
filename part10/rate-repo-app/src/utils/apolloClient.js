import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'

const httpLink = createHttpLink({
  uri: Constants.manifest.extra.apollo,
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination()
      }
    }
  }
})

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const token = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: token ? `bearer ${token}` : '',
        },
      }
    } catch (err) {
      console.log(err)
      return { headers }
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  })
}

export default createApolloClient
