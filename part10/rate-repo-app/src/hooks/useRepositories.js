import { useState, useEffect } from 'react'
import { SERVER_ADDRESS, API_PORT } from '../utils/config'

export const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const [loading, setLoading] = useState(false)

  const fetchRepositories = async () => {
    setLoading(true)

    const res = await fetch(`${SERVER_ADDRESS}:${API_PORT}/api/repositories`)
    const json = await res.json()

    setLoading(false)
    setRepositories(json)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return { repositories, loading, refetch: fetchRepositories }
}
