import { FlatList, View, StyleSheet } from 'react-native'

import RepositoryItem from './RepositoryItem'
import { useRepositories } from '../../../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'whitesmoke',
  },
})

export const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.map(({ node }) => node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
