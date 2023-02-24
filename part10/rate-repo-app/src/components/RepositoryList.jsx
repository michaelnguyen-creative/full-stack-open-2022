import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'

import { gql, useQuery } from '@apollo/client'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'whitesmoke',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const GET_REPOSITORIES = gql`
  query getRepositories {
    repositories {
      edges {
        node {
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          reviewCount
          forksCount
          ratingAverage
        }
      }
    }
  }
`

const RepositoryList = () => {
  const { loading, data: repositories } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })

  if (loading) return "Loading repositories..."

  const { repositories: { edges }} = repositories

  const repositoryNodes = edges
    ? edges.map(({ node }) => node)
    : []

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
