import { FlatList } from 'react-native'

import RepositoryItem from './RepositoryItem'
import ItemSeparator from '../../../components/ItemSeparator'

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(({ node }) => node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default RepositoryListContainer
