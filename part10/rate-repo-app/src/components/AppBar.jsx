import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'
import { gql, useQuery } from '@apollo/client'
import { useAuthStorage } from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // flexDirection: 'row',
  },
  repositoriesTab: {
    backgroundColor: '#6D4AD9',
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '5%',
  },
  text: {
    color: '#F2F2F2',
    fontSize: 16,
    // flex: 1
  },
  //
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
            : '/'
        }
        // replace={true}
      >
        <Text style={styles.text} onPress={onPress}>{tabName}</Text>
      </Link>
    </Pressable>
  )
}

const WHOAMI = gql`
  query me {
    me {
      username
    }
  }
`

const AppBar = () => {
  const { data, loading } = useQuery(WHOAMI)
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  if (loading) return 
  console.log('me', data.me)

  const logout = async () => {
    await authStorage.removeAccessToken()
    console.log('access token removed')
    apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={{}}>
        <AppBarTab tabName="Repositories" />
        {data.me ? (
          <AppBarTab tabName="Sign out" onPress={logout} />
        ) : (
          <AppBarTab tabName="Sign in" />
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
