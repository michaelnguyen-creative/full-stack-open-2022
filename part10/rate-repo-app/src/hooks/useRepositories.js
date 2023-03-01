// import { useState, useEffect } from 'react'
// import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'


export const useRepositories = () => {
  // const [repositories, setRepositories] = useState()
  // const [loading, setLoading] = useState(false)
  const { loading, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return 'Loading repositories'

  const {
    repositories: { edges },
  } = data

  // const fetchRepositories = async () => {
  //   setLoading(true)

  //   const res = await fetch(`${Constants.manifest.API_URI}/repositories`)
  //   const json = await res.json()

  //   setLoading(false)
  //   setRepositories(json)
  // }

  // useEffect(() => {
  //   fetchRepositories()
  // }, [])

  return { repositories: edges, refetch }
}
