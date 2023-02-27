// import { View } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import Constants from 'expo-constants'

import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'
// import BMICalculator from './playground/bmiCalculator'

const apolloClient = createApolloClient()

const App = () => {
  console.log('const', Constants)

  return (
    <>
      <StatusBar style="auto" />
      {/* <BMICalculator /> */}
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  )
}

export default App
