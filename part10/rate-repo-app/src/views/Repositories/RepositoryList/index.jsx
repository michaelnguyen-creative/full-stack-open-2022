import { FlatList, View, /* Modal, */ StyleSheet } from 'react-native'
import { useState } from 'react'

import RepositoryItem from './RepositoryItem'
import { useRepositories } from '../../../hooks/useRepositories'

import SelectModal from '../../../components/forms/elements/SelectModal'

const selectItems = [
  {
    label: 'Latest repositories',
    value: {
      orderBy: 'CREATED_AT',
      // test DESC vs. ASCE
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
  const [currentLabel, setCurrentLabel] = useState(selectItems[0].label)
  const [selectedValue, setSelectedValue] = useState(selectItems[0].value)
  const { repositories, refetchRepositories } = useRepositories(selectedValue)

  const returnValue = async ({ label, value }) => {
    setCurrentLabel(label)
    setSelectedValue(value)
    await refetchRepositories(selectedValue)
    console.log('SelectModal/returnValue', selectedValue)
  }

  return (
    <View>
      <View style={{ zIndex: 5 }}>
        <SelectModal
          returnValue={returnValue}
          currentLabel={currentLabel}
          data={selectItems}
          selectLabel="Select an item..."
        />
      </View>
      <View style={{ zIndex: 0 }}>
        <RepositoryListContainer repositories={repositories} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 30,
    width: 375,
    backgroundColor: 'whitesmoke',
  },
})

export default RepositoryList
