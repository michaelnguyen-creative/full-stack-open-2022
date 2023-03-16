import { Button, FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

import ReviewItem from '../../Reviews/ReviewItem'
import RepositoryItem from '../RepositoryList/RepositoryItem'
import ItemSeparator from '../../../components/ItemSeparator'

import { useRepository } from '../../../hooks/useRepository'

const RepositoryContainer = ({ data, onEndReached }) => {
  const openLink = async () => {
    await Linking.openURL(data.url)
  }
  const reviewNodes = data.reviews
    ? data.reviews.edges.map(({ node }) => node)
    : []

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem key={item.id} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryItem item={data}>
          <Button title="Open in GitHub" onPress={openLink} />
        </RepositoryItem>
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
  )
}

const SingleRepositoryPage = () => {
  const repositoryId = useParams().repoId
  const { loading, ...result } = useRepository({
    repositoryId,
    first: 3,
  })

  if (loading) return
  const {
    data: { repository },
  } = result

  const fetchMoreReviews = () => result.fetchMoreReviews()

  return (
    <RepositoryContainer data={repository} onEndReached={fetchMoreReviews} />
  )
}

export default SingleRepositoryPage
