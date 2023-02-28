import { FlatList, View, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'

import RepositoryItem from './RepositoryItem'
import { GET_REPOSITORIES } from '../graphql/queries'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'whitesmoke',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { loading, data: repositories } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return 'Loading repositories...'

  const {
    repositories: { edges },
  } = repositories

  const repositoryNodes = edges ? edges.map(({ node }) => node) : []

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  )
}

export default RepositoryList
