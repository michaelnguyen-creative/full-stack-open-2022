import { Pressable, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import { Typography } from '../Typography.styles'

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
    backgroundColor: '#6D4AD9',
    alignItems: 'flex-start',
    padding: '5%',
  },
  text: {
    color: 'white'
  }
})


export default AppBarTab
