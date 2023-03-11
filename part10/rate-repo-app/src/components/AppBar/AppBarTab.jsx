import { Text, Pressable, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  repositoriesTab: {
    backgroundColor: '#6D4AD9',
    alignItems: 'flex-start',
    padding: '5%',
  },
  text: {
    color: '#F2F2F2',
    fontSize: 16,
  },
})

const AppBarTab = ({ tabName, onPress }) => {
  return (
    <Pressable style={styles.repositoriesTab} onPress={onPress}>
      <Link
        to={
          tabName === 'Repositories'
            ? '/'
            : tabName === 'Sign in'
            ? '/signin'
            : tabName === 'Create a review'
            ? '/review'
            : tabName === 'Sign up'
            ? '/signup'
            : '/'
        }
      >
        <Text style={styles.text} onPress={onPress}>{tabName}</Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
