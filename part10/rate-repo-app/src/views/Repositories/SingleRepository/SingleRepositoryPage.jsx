import { Button, FlatList } from 'react-native'
import RepositoryItem from '../RepositoryList/RepositoryItem'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

import { GET_REPO } from '../../../graphql/queries'
import ItemSeparator from '../../../components/ItemSeparator'
import ReviewItem from '../../Reviews/ReviewItem'

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
  const repoId = useParams().repoId
  const { data, loading } = useQuery(GET_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repoId,
    },
    onError: (e) => console.log(e),
  })

  if (loading) return
  const { repository } = data

  const reviewNodes = repository
    ? repository.reviews.edges.map(({ node }) => node)
    : []

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem key={item.id} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<Repository repository={repository} />}
    />
  )
}

export default SingleRepositoryPage
