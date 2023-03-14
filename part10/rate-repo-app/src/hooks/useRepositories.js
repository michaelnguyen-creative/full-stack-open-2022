import { useLazyQuery } from '@apollo/client'
import {
  GET_REPOSITORIES,
  GET_REPOSITORIES_KEYWORD,
  GET_REPOSITORIES_ORDER,
} from '../graphql/queries'

const parseQueryArguments = (argsObj) => {
  if (JSON.stringify(argsObj).includes('order')) {
    return { variables: argsObj, query: GET_REPOSITORIES_ORDER }
  }

  if (JSON.stringify(argsObj).includes('search')) {
    return { variables: argsObj, query: GET_REPOSITORIES_KEYWORD }
  }

  return { variables: {}, query: GET_REPOSITORIES }
}

const executeQuery = (query, variables) => {
  const [getRepositories, { data, loading, fetchMore, ...result }] =
    useLazyQuery(query, {
      fetchPolicy: 'cache-and-network',
      variables,
      onError: (e) => console.log(e),
      // onCompleted: (data) => console.log(query.definitions[1].name.value, variables, data)
    })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextpage

    if (!canFetchMore) return

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return [
    getRepositories,
    {
      fetchMore: handleFetchMore,
      loading,
      ...result,
    },
  ]
}

export const useRepositories = (argsObj) => {
  const { query, variables } = parseQueryArguments(argsObj)
  const [getRepositories, result] = executeQuery(query, variables)
  return [getRepositories, result]
}
