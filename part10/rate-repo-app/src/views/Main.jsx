import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'

import RepositoryListPage from './Repositories/RepositoryList/RepositoryListPage'
import AppBar from './AppBar'
import SignIn from './SignIn/SignInPage'
import SingleRepositoryPage from './Repositories/SingleRepository/SingleRepositoryPage'
import CreateReview from './Reviews/CreateReview'
import SignUpPage from './SignUp/SignUpPage'
import MyReviews from './Reviews/MyReviews'

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryListPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/:repoId" element={<SingleRepositoryPage />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/user/my-reviews" element={<MyReviews />} />
      </Routes>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

export default Main
