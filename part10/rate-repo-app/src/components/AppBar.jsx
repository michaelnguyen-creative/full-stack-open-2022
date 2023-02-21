import { View, StyleSheet, Text, Pressable } from 'react-native'
import { Link, } from 'react-router-native'
import Constants from 'expo-constants'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
  },
  repositoriesTab: {
    backgroundColor: '#6D4AD9',
    flex: 1,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '5%',
  },
  text: {
    color: '#F2F2F2',
    fontSize: 16,
  },
  //
})

const AppBarTab = ({ tabName }) => {
  return (
    <Pressable style={styles.repositoriesTab}>
      <Link
        to={
          tabName === 'Repositories'
            ? '/'
            : tabName === 'Sign in'
            ? '/signin'
            : ''
        }
        replace={true}
      >
        <Text style={styles.text}>{tabName}</Text>
      </Link>
    </Pressable>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabName="Repositories" />
      <AppBarTab tabName="Sign in" />
    </View>
  )
}

export default AppBar
