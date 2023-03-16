import { FlatList } from 'react-native'

import RepositoryItem from './RepositoryItem'
import ItemSeparator from '../../components/ItemSeparator'

export const RepositoryListContainer = ({
  data,
  onEndReached,
}) => {
  const repositoryNodes = data
    ? data.edges.map(({ node }) => node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
  )
}

export default RepositoryListContainer
