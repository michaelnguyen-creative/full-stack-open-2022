import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'

import RepositoryList from './RepositoryList'
import AppBar from './AppBar/index'
import SignIn from './SignIn/index'

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
      </Routes>
    </View>
  )
}

export default Main
