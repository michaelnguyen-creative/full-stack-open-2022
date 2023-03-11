import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'

import RepositoryListPage from './Repositories/RepositoryList/RepositoryListPage'
import AppBar from '../components/layout/navigation/AppBar/index'
import SignIn from './SignIn/SignInPage'
import SingleRepositoryPage from './Repositories/SingleRepository/SingleRepositoryPage'
import ReviewPage from './Reviews/ReviewPage'
import SignUpPage from './SignUp/SignUpPage'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryListPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/:repoId" element={<SingleRepositoryPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />}/>
      </Routes>
    </View>
  )
}

export default Main
