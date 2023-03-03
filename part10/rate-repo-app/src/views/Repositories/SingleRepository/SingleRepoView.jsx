import { Button, FlatList, Text, View } from 'react-native'
import RepositoryItem from '../RepositoryList/RepositoryItem'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

import { GET_REPO } from '../../../graphql/queries'
import { Typography } from '../../../components/Typography'
import { ItemSeparator } from '../RepositoryList/index'

const RepoInfo = ({ repository }) => {
  const openLink = async () => {
    await Linking.openURL(repository.url)
  }

  return (
    <RepositoryItem item={repository}>
      <Button title="Open in GitHub" onPress={openLink} />
    </RepositoryItem>
  )
}

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

const SingleRepoView = () => {
  const repoId = useParams().repoId
  const { data, loading } = useQuery(GET_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repoId,
    },
    onError: (e) => console.log(e),
  })

  console.log(repoId)
  if (loading) return ''
  const { repository } = data
  const reviews = repository ? repository.reviews.edges.map(({ node }) => node) : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <Review key={item.id} review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<RepoInfo repository={repository} />}
    />
  )
}

export default SingleRepoView
