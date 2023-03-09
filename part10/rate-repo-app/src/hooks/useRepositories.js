import { useLazyQuery } from '@apollo/client'
import { useState } from 'react'
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
  const [getRepositories, result] = useLazyQuery(query, {
    fetchPolicy: 'cache-and-network',
    variables,
    onError: (e) => console.log(e),
    onCompleted: (data) => console.log(query.definitions[1].name.value, variables, data)
  })

  return [getRepositories, result]
}

export const useRepositories = (argsObj) => {
  const { query, variables } = parseQueryArguments(argsObj)
  const [getRepositories, result] = executeQuery(query, variables)
  return [getRepositories, result]
}
