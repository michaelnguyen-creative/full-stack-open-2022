import { StyleSheet, View, Text } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'

import RepositoryListPage from './RepositoryList/RepositoryListPage'
import AppBar from './AppBar'
import SignIn from './SignIn/SignInPage'
import SingleRepositoryPage from './RepositoryList/SingleRepository/SingleRepositoryPage'
import CreateReview from './Reviews/CreateReview/CreateReview'
import SignUpPage from './SignUp/SignUpPage'
import MyReviews from './Reviews/MyReviews'

import theme from '../theme'

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View style={styles.appBarContainer}>
          <AppBar />
        </View>
        <View style={styles.appContentContainer}>
          <Routes>
            <Route path="/" element={<RepositoryListPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/:repoId" element={<SingleRepositoryPage />} />
            <Route path="/create-review" element={<CreateReview />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/user/my-reviews" element={<MyReviews />} />
          </Routes>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.ui.background,
  },
  appContainer: {
    width: 375,
    height: 667,
    justifyContent: 'space-between',
  },
  appBarContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.primary.dark,
    paddingTop: Constants.statusBarHeight,
  },
  appContentContainer: {
    flex: 10,
  },
})

export default Main
