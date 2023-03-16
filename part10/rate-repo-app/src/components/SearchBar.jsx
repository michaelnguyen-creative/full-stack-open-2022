import { TextInput, View, StyleSheet } from 'react-native'
import { Entypo, Feather } from '@expo/vector-icons'

const SearchBar = ({ handleTextChange, sx }) => {
  return (
    <View style={{...styles.container, ...sx}}>
      <Entypo name="magnifying-glass" size={24} color="black" />
      <TextInput placeholder="Type to search" onChangeText={handleTextChange} />
      <Feather name="x" size={24} color="black" />
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
