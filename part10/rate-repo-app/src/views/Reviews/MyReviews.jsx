import { FlatList, View, Text } from 'react-native'
import ReviewItem from './ReviewItem'
import { WHOAMI } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import ItemSeparator from '../../components/ItemSeparator'

const NoReview = () => {
  return (
    <View>
      <Text>Seems like you don't have any review yet</Text>
    </View>
  )
}

const MyReviews = () => {
  const { data, loading } = useQuery(WHOAMI, {
    variables: { includeReview: true },
    onCompleted: (data) => console.log(data),
  })
  if (loading) return
  const {
    me: { reviews },
  } = data

  const reviewNodes =
    reviews.edges.length !== 0 ? reviews.edges.map(({ node }) => node) : []

    return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem key={item.id} item={item} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<NoReview />}
      // onEndReached={(info) => console.log(info)}
      // onEndReachedThreshold={0.1}
    />
  )
}

export default MyReviews
