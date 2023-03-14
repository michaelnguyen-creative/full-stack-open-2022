import { useState, useEffect } from 'react'
import { Pressable, View, StyleSheet } from 'react-native'

import { useRepositories } from '../../../hooks/useRepositories'

import Dialog from '../../../components/Dialog'
import { Typography } from '../../../components/Typography.styles'
import SelectOptions from '../../../components/SelectOptions'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const RepositoriesSort = ({ onPrincipleChange, queryVariables }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const handleSelection = (itemObj) => {
    onPrincipleChange({ ...queryVariables, ...itemObj.value })
    closeDialog()
  }

  // Note: Quick fix, more robust implementation needed
  const currentLabel = selectItems.find(
    (item) =>
      JSON.stringify(item.value) ===
      JSON.stringify({
        orderBy: queryVariables.orderBy,
        orderDirection: queryVariables.orderDirection,
      })
  )?.label

  return (
    <>
      <Dialog isOpen={isOpen} onClose={closeDialog} animationType="fade">
        <SelectOptions
          data={selectItems}
          onSelect={handleSelection}
          selectLabel="Select an item..."
        />
      </Dialog>
      <Pressable onPress={openDialog}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 375,
            padding: 20,
            backgroundColor: 'whitesmoke',
          }}
        >
          <Typography
            variant="body2"
            style={{
              textAlign: 'center',
              color: 'black',
            }}
          >
            {currentLabel}
          </Typography>
          <FontAwesomeIcon icon={faCaretDown} />
        </View>
      </Pressable>
    </>
  )
}

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

const styles = StyleSheet.create({})

export default RepositoriesSort
