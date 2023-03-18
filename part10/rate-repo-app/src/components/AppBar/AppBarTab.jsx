import { Pressable, View, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import { Typography } from '../Typography.styles'
import theme from '../../theme'

const AppBarTab = ({ tabName, linkTo, onPress }) => {
  return (
    // <Pressable style={styles.container} onPress={onPress}>
      <Link to={linkTo} style={styles.container}>
        {/* <View style={{paddingRight: '10%', paddingLeft: '10%', }}> */}<Typography variant="subtitle2" sx={styles.text} onPress={onPress}>{tabName}</Typography>{/* </View> */}
      </Link>
    // </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // padding: '5%',
    // padding: '0 10%',
    // paddingRight: '10%', paddingLeft: '10%',
    margin: 10,
    flex: 1
  },
  text: {
    color: theme.colors.on.onPrimary.onDark,
    // paddingRight: '10%', paddingLeft: '10%',

    // fontSize: 8
  }
})


export default AppBarTab
