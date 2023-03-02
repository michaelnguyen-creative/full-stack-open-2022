import { Button } from 'react-native'
import RepositoryItem from './RepositoryItem'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import * as Linking from 'expo-linking'

import { GET_REPO } from '../../graphql/queries'

const SingleRepoView = () => {
  const repoId = useParams().repoId
  const { data, loading } = useQuery(GET_REPO, {
    variables: {
      repoId,
    },
  })
  if (loading) return ''

  const openLink = async () => {
    await Linking.openURL(data.repository.url)
  }

  return (
    <RepositoryItem item={data.repository}>
      <Button title="Open in GitHub" onPress={openLink} />
    </RepositoryItem>
  )
}

export default SingleRepoView
