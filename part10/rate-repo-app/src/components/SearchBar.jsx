import { TextInput, View, StyleSheet } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ handleTextChange }) => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <TextInput placeholder="Type to search" onChangeText={handleTextChange} />
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
