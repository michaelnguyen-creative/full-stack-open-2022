import { View, Button, StyleSheet, Alert, Platform } from 'react-native'
import { Typography } from '../../components/Typography.styles'
import * as Linking from 'expo-linking'
import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../../graphql/mutations'
import { WHOAMI } from '../../graphql/queries'

const ReviewItem = ({ item: { createdAt, rating, text, id, ...props } }) => {
  const [removeReview] = useMutation(DELETE_REVIEW, {
    onError: (e) => console.log(e),
    refetchQueries: [{ query: WHOAMI }, 'whoAmI'],
  })
  const { user, repository } = props
  const title = user ? user.username : repository ? repository.fullName : ''

  const time = new Date(createdAt)

  const openRepository = (url) => Linking.openURL(url)

  const deleteReview = (reviewId) => {
    if (Platform.OS === 'web') {
      return (
        confirm('Are you sure you want to delete this review?') &&
        removeReview({
          variables: { deleteReviewId: reviewId },
        })
      )
    }

    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('delete review canceled'),
        },
        {
          text: 'Delete',
          onPress: () => removeReview({ deleteReviewId: reviewId }),
        },
      ]
    )
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          padding: '5%',
          width: 375,
          justifyContent: 'space-evenly',
        }}
        id={id}
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
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="caption">{time.toLocaleDateString()}</Typography>
          <View style={{ flexWrap: 'wrap' }}>
            <Typography style={{ textAlign: 'left' }}>{text}</Typography>
          </View>
        </View>
      </View>
      {repository && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            color="blue"
            title="View repositories"
            onPress={() => openRepository(props.repository.url)}
          />
          <Button
            color="red"
            title="Delete review"
            onPress={() => deleteReview(id)}
          />
        </View>
      )}
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    
  }
})

export default ReviewItem
