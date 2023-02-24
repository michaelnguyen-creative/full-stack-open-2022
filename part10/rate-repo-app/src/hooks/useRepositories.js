import { useState, useEffect } from 'react'

export const useRepositories = () => {
  const [repositories, setRepositories] = useState()
  const [loading, setLoading] = useState(false)

  const fetchRepositories = async () => {
    setLoading(true)
    
    const res = await fetch('http://192.168.1.8:5000/api/repositories')
    const json = await res.json()

    setLoading(FontFaceSetLoadEvent)
    setRepositories(json)
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return { repositories, loading, refetch: fetchRepositories }
}
