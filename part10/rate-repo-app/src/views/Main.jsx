import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'

import RepositoryList from './Repositories/RepositoryList/index'
import AppBar from '../components/layout/navigation/AppBar/index'
import SignIn from './SignIn/index'
import SingleRepoView from './Repositories/SingleRepository/SingleRepoView'
import ReviewPage from './Reviews/ReviewPage'

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
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:repoId" element={<SingleRepoView />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </View>
  )
}

export default Main
