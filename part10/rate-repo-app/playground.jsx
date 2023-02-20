import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  flexItemA: {
    flexGrow: 0,
    backgroundColor: 'green',
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: 'blue',
  },
  text: {
    color: 'grey',
    fontSize: 14,
  },
  blueText: {
    color: 'blue',
  },
  bigText: {
    fontSize: 24,
    fontWeight: 700,
  },
})

const FancyText = ({ children, isBlue, isBig }) => {
  const textStyles = [
    styles.text,
    isBlue && styles.blueText,
    isBig && styles.bigText,
  ]
  return <Text style={textStyles}>{children}</Text>
}

const CustomText = () => {
  return (
    <>
      <FancyText>Simple text</FancyText>
      <FancyText isBlue>Blue text</FancyText>
      <FancyText isBig>Big Text</FancyText>
      <FancyText isBlue isBig>
        Big Blue Text
      </FancyText>
    </>
  )
}

export const FlexBox = () => (
  <View style={styles.flexContainer}>
    <View style={styles.flexItemA}>
      <Text>Flex item A</Text>
    </View>
    <View style={styles.flexItemB}>
      <Text>Flex item B</Text>
    </View>
  </View>
)

export default CustomText
