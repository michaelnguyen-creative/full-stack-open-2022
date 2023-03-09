import { TextInput, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

import { useDebouncedCallback } from 'use-debounce'
import { useRepositories } from '../hooks/useRepositories'

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState({ searchKeyword: '' })
  const debounced = useDebouncedCallback((value) => {
    setValue({ searchKeyword: value })
  }, 1000)
  const [getRepositories] = useRepositories(value)

  useEffect(() => {
    onSearch(getRepositories)
  }, [value])

  const updateText = async (text) => {
    debounced(text)
  }

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <TextInput placeholder="Type to search" onChangeText={updateText} />
      <FontAwesomeIcon icon={faXmark} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
  },
})

export default SearchBar
