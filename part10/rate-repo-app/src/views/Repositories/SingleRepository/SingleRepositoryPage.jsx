import { Button, FlatList } from 'react-native'
import RepositoryItem from '../RepositoryList/RepositoryItem'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

import { GET_REPO } from '../../../graphql/queries'
import ItemSeparator from '../../../components/ItemSeparator'
import ReviewItem from '../../Reviews/ReviewItem'
import { useRepository } from '../../../hooks/useRepository'

const Repository = ({ repository }) => {
  const openLink = async () => {
    await Linking.openURL(repository.url)
  }

  return (
    <RepositoryItem item={repository}>
      <Button title="Open in GitHub" onPress={openLink} />
    </RepositoryItem>
  )
}

const SingleRepositoryPage = () => {
  const repositoryId = useParams().repoId
  const { loading, ...result } = useRepository({
    repositoryId,
    first: 3,
  })

  if (loading) return
  const { data: { repository } } = result

  const reviewNodes = repository
    ? repository.reviews.edges.map(({ node }) => node)
    : []

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem key={item.id} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<Repository repository={repository} />}
      onEndReached={() => result.fetchMoreReviews()}
      onEndReachedThreshold={0.1}
    />
  )
}

export default SingleRepositoryPage
