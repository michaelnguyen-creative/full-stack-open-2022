import { Pressable, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import { Typography } from '../Typography.styles'
import theme from '../../theme'

const AppBarTab = ({ tabName, linkTo, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Link to={linkTo}>
        <Typography variant="subtitle2" sx={styles.text} onPress={onPress}>{tabName}</Typography>
      </Link>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: '5%',
  },
  text: {
    color: theme.colors.on.onPrimary.onDark
  }
})


export default AppBarTab
