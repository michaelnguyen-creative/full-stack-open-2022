import { StyleSheet, View, Text } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'

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
      <View style={styles.appContainer}>
        <View style={styles.appStatusBarContainer}>
          <StatusBar style="auto" />
        </View>
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
    // width: '100%',
    // height: '100%',
    justifyContent: 'space-between',
  },
  appStatusBarContainer: {
    flex: 0.5,
    backgroundColor: theme.colors.primary.variant1,
  },
  appBarContainer: {
    flex: 1,
  },
  appContentContainer: {
    flex: 10.5,
  },
})

export default Main
