import { View, StyleSheet } from 'react-native'
import { Typography } from '../../components/Typography.styles'

const Review = ({
  review: {
    createdAt,
    rating,
    text,
    user: { username },
  },
}) => {

  const time = new Date(createdAt)
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        padding: '5%',
        width: 375,
        justifyContent: 'space-evenly',
      }}
    >
      <View
        style={{
          borderColor: 'blue',
          width: 40,
          height: 40,
          borderWidth: 2,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2">{rating}</Typography>
      </View>
      <View style={{ flexDirection: 'column', width: 275 }}>
        <Typography variant="subtitle2">{username}</Typography>
        <Typography variant="caption">{time.toLocaleDateString()}</Typography>
        <View style={{ flexWrap: 'wrap' }}>
          <Typography style={{ textAlign: 'left' }}>{text}</Typography>
        </View>
      </View>
    </View>
  )
}

export default Review
