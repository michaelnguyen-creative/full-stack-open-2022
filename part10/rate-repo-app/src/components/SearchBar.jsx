import { TextInput, View, StyleSheet } from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ handleTextChange, sx }) => {
  return (
    <View style={{...styles.container, ...sx}}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <TextInput placeholder="Type to search" onChangeText={handleTextChange} />
      <FontAwesomeIcon icon={faXmark} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
    backgroundColor: 'white',
  },
})

export default SearchBar
