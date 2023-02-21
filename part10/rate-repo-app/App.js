import { View } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'

import Main from './src/components/Main'
// import CustomText, { FlexBox } from './playground'
// import Text from './src/components/Text'

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
      {/* <View>
        <CustomText />
        <View>
          <Text>Simple text</Text>
          <Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
          <Text fontWeight="bold" fontSize="subheading">
            Bold subheading
          </Text>
          <Text color="textSecondary">Text with secondary color</Text>
        </View>
        <FlexBox />
      </View> */}
    </>
  )
}

export default App
