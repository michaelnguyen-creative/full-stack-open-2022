import { View, StyleSheet, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { useQuery, useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import theme from '../theme'

import AppBarTab from '../components/AppBar/AppBarTab'
import { useAuthStorage } from '../hooks/useAuthStorage'
import { WHOAMI } from '../graphql/queries'

const AppBar = () => {
  const { data, loading } = useQuery(WHOAMI, {
    variables: {
      includeReview: false,
    },
    // onCompleted: (data) => console.log('appbar/whoami', data)
  })
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const navigate = useNavigate()

  if (loading) return
  // console.log('data', data)
  // const { me } = data

  const logout = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate('/')
  }

  return (
    // <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Repositories" linkTo="/" />
        {data?.me ? (
          <>
            <AppBarTab tabName="Create a review" linkTo="create-review" />
            <AppBarTab tabName="Sign out" onPress={logout} />
            <AppBarTab tabName="My reviews" linkTo="/user/my-reviews" />
          </>
        ) : (
          <>
            <AppBarTab tabName="Sign in" linkTo="/signin" />
            <AppBarTab tabName="Sign up" linkTo="/signup" />
          </>
        )}
      </ScrollView>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: Constants.statusBarHeight / 6,
    // flex: 1,
    // width: '100%',
    // height: '100%',
    // justifyContent: 'center',
    // backgroundColor: theme.colors.primary.dark,
    // shadowColor: 'gray',
    // shadowOffset: {
    //   width: 10,
    //   height: 10
    // }
    // height: '20%'
  },
})

export default AppBar
