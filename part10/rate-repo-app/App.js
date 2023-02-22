import { View } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'

import Main from './src/components/Main'
// import BMICalculator from './playground/bmiCalculator'


const App = () => {
  return (
    <>
      {/* <BMICalculator /> */}
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  )
}

export default App
