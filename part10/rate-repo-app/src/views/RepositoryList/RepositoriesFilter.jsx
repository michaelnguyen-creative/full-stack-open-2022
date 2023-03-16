import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import SearchBar from '../../components/SearchBar'

const RepositoriesFilter = ({ onUserInput, queryVariables }) => {
  const [value, setValue] = useState('')
  const debounced = useDebouncedCallback((value) => {
    setValue(value)
  }, 1000)

  useEffect(() => {
    if (value) {
      onUserInput({ ...queryVariables, searchKeyword: value })
    }
  }, [value])

  const updateText = (text) => {
    debounced(text)
  }

  return <SearchBar handleTextChange={updateText} />
}

export default RepositoriesFilter
