import { View } from 'react-native'
import Main from './src/components/Main'
// import CustomText, { FlexBox } from './playground'
// import Text from './src/components/Text'

const App = () => {
  return (
    <View>
      <Main />
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
    </View>
  )
}

export default App
