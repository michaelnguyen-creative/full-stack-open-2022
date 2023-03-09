import { View, StyleSheet } from 'react-native'

const ItemSeparator = () => <View style={styles.separator} />

const styles = StyleSheet.create({
  separator: {
    height: 30,
    width: 375,
    backgroundColor: 'whitesmoke',
  },
})

export default ItemSeparator