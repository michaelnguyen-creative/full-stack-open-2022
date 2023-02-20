import { View, StyleSheet, Text, Pressable } from 'react-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 40,
    flexDirection: 'row',
  },
  repositoriesTab: {
    backgroundColor: '#6D4AD9',
    flex: 1,
    justifyContent: 'center',
    padding: '5%'
  },
  text: {
    color: '#F2F2F2',
  },
  //
})

const AppBarTab = ({ tabName }) => {
  return (
    <Pressable style={styles.repositoriesTab}>
      <Text style={styles.text}>{tabName}</Text>
    </Pressable>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabName="Repositories" />
    </View>
  )
}

export default AppBar
