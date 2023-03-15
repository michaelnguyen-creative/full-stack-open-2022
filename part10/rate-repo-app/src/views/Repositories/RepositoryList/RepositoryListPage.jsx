import { View, StyleSheet } from 'react-native'
import { useState } from 'react'

import RepositoryListContainer from './RepositoryListContainer'
import RepositoriesSort from './RepositoriesSort'
import RepositoriesFilter from './RepositoriesFilter'

import { useRepos } from '../../../hooks/useRepos'

const RepositoryListPage = () => {
  const [queryVariables, setQueryVariables] = useState({
    searchKeyword: '',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
    first: 3,
  })
  const { loading, ...result } = useRepos(queryVariables)

  if (loading) return
  const {
    data: { repositories },
    fetchMore,
    refetch,
  } = result

  const updateRepositories = (variables) => {
    setQueryVariables(variables)
    // console.log('refetching repositories', variables)
    refetch(variables)
  }

  const fetchMoreRepositories = () => {
    // console.log('fetching more repositories')
    fetchMore()
  }

  return (
    <>
      <View style={styles.repositoriesFilterContainer}>
        <RepositoriesFilter
          onUserInput={updateRepositories}
          queryVariables={queryVariables}
        />
      </View>
      <View style={styles.repositoriesSortContainer}>
        <RepositoriesSort
          onPrincipleChange={updateRepositories}
          queryVariables={queryVariables}
        />
      </View>
      <View style={styles.repositoryListContainer}>
        <RepositoryListContainer
          repositories={repositories}
          onEndReached={fetchMoreRepositories}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  repositoriesFilterContainer: {
    flex: 1,
  },
  repositoriesSortContainer: {
    flex: 1,
  },
  repositoryListContainer: {
    flex: 8,
  },
})

export default RepositoryListPage
