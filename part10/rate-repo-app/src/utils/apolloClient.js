import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { SERVER_ADDRESS, GQL_PORT } from './config'

const httpLink = createHttpLink({
  uri: `${SERVER_ADDRESS}:${GQL_PORT}/graphql`,
})

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
