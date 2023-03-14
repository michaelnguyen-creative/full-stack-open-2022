import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { View } from 'react-native';

import SearchBar from "../../../components/SearchBar";
import { useRepositories } from "../../../hooks/useRepositories";

const RepositoriesFilter = ({ onFilter }) => {
  const [value, setValue] = useState(null)
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
    <View style={{ width: 375, padding: '2%' }}>
      <SearchBar handleTextChange={updateText} />
    </View>
  )
}

export default RepositoriesFilter
