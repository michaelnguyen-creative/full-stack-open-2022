import { View } from 'react-native'
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
    first: 5,
  })
  const { loading, ...result } = useRepos(queryVariables)

  if (loading) return
  const { data: { repositories }, fetchMore, refetch } = result

  const updateRepositories = (variables) => {
    setQueryVariables(variables) 
    console.log('refetching repositories', variables)   
    refetch(variables)
  }

  const fetchMoreRepositories = () => {
    console.log('fetching more repositories')
    fetchMore()
  }

  return (
    <View>
      <View style={{ zIndex: 5 }}>
        <RepositoriesFilter onUserInput={updateRepositories} queryVariables={queryVariables}/>
        <RepositoriesSort
          onPrincipleChange={updateRepositories}
          queryVariables={queryVariables}
        />
      </View>
      <View style={{ zIndex: 0 }}>
        <RepositoryListContainer
          repositories={repositories}
          onEndReached={fetchMoreRepositories}
        />
      </View>
    </View>
  )
}



export default RepositoryListPage
