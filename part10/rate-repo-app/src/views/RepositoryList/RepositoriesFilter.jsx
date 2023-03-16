import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
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

  return (
    <View style={styles.container}>
      <SearchBar
        handleTextChange={updateText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '80%',
  },
})

export default RepositoriesFilter
