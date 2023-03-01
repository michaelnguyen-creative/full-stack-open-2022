import { FlatList, View, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'

import RepositoryItem from './RepositoryItem'
import { GET_REPOSITORIES } from '../../graphql/queries'
import { useRepositories } from '../../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'whitesmoke',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

// export const RepositoryListContainer = ({ repositories }) => {
//   const repositoryNodes = edges ? edges.map(({ node }) => node) : []
  
// }

const RepositoryList = () => {
  const { repositories } = useRepositories()
  
  const repositoryNodes = repositories ? repositories.map(({ node }) => node) : []

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
