import { View } from 'react-native'
import { useState } from 'react'

import RepositoryListContainer from './RepositoryListContainer'
import RepositoriesSort from './RepositoriesSort'
import RepositoriesFilter from './RepositoriesFilter'

const selectItems = [
  {
    label: 'Latest repositories',
    value: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    },
  },
  {
    label: 'Highest rated repositories',
    value: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    },
  },
  {
    label: 'Lowest rated repositories',
    value: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    },
  },
]

const RepositoryListPage = () => {
  const [currentRepositories, setCurrentRepositories] = useState(null)

  const updateRepositories = async (fetchData) => {
    const {
      data: { repositories },
    } = await fetchData()
    setCurrentRepositories(repositories)
  }

  return (
    <View>
      <View style={{ zIndex: 5 }}>
        <RepositoriesFilter onFilter={updateRepositories} />
        <RepositoriesSort
          data={selectItems}
          selectLabel="Select an item..."
          onSelect={updateRepositories}
        />
      </View>
      <View style={{ zIndex: 0 }}>
        <RepositoryListContainer repositories={currentRepositories} />
      </View>
    </View>
  )
}

export default RepositoryListPage
