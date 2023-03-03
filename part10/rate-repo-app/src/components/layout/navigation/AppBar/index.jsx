import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { useQuery, useApolloClient } from '@apollo/client'

import AppBarTab from './AppBarTab'
import { useAuthStorage } from '../../hooks/useAuthStorage'
import { WHOAMI } from '../../graphql/queries'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
})

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
