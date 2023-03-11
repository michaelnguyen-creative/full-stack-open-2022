import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import SearchBar from "../../../components/SearchBar";
import { useRepositories } from "../../../hooks/useRepositories";

const RepositoriesFilter = ({ onFilter }) => {
  const [value, setValue] = useState({ searchKeyword: '' })
  const debounced = useDebouncedCallback((value) => {
    setValue({ searchKeyword: value })
  }, 1000)
  const [getRepositories] = useRepositories(value)

  useEffect(() => {
    onFilter(getRepositories)
  }, [value])

  const updateText = (text) => {
    debounced(text)
  }

  return (
    <SearchBar handleTextChange={updateText} />
  )
}

export default RepositoriesFilter
