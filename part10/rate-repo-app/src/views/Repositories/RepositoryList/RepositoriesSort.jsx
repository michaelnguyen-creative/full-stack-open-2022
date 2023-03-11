import { useState, useEffect } from 'react'
import { Pressable, View, StyleSheet } from 'react-native'

import { useRepositories } from '../../../hooks/useRepositories'

import Dialog from '../../../components/Dialog'
import { Typography } from '../../../components/Typography.styles'
import SelectOptions from '../../../components/SelectOptions'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const SortingSelection = ({ data, onSelect, selectLabel }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(data[0])
  const [getRepositories] = useRepositories(selectedItem.value)

  useEffect(() => {
    onSelect(getRepositories)
  }, [selectedItem])

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  const selectItem = (item) => {
    setSelectedItem(item)
    closeDialog()
  }

  return (
    <>
      <Dialog isOpen={isOpen} onClose={closeDialog} animationType="fade">
        <SelectOptions
          data={data}
          onSelect={selectItem}
          selectLabel={selectLabel}
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
            {selectedItem.label}
          </Typography>
          <FontAwesomeIcon icon={faCaretDown} />
        </View>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({

})

export default SortingSelection