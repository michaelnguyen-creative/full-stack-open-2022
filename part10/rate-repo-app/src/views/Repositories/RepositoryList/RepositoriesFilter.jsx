import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { View } from 'react-native'

import SearchBar from '../../../components/SearchBar'

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

  return (
    <View style={{ width: 375, padding: '2%' }}>
      <SearchBar handleTextChange={updateText} />
    </View>
  )
}

export default RepositoriesFilter
