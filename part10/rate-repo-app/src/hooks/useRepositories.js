// import { useState, useEffect } from 'react'
// import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

export const useRepositories = (argsObj) => {
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: argsObj,
    onCompleted: (data) => console.log('GET_REPOSITORIES/data', data)
  })

  if (loading) return []

  const {
    repositories: { edges },
  } = data

  return { repositories: edges, refetchRepositories: refetch }
}
