import { useState } from 'react'
import { Pressable, View, Modal } from 'react-native'
import { Typography } from '../texts/Typography.styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import SelectOptions from './SelectOptions'
import Dialog from '../Dialog'

import { useEffect } from 'react'
import { useRepositories } from '../../hooks/useRepositories'

const SelectMenu = ({ data, onSelect, selectLabel }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(data[0])
  const [getRepositories] = useRepositories(selectedItem.value)

  useEffect(() => {
    onSelect(getRepositories)
  }, [selectedItem])

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  return (
    <>
      <Dialog isOpen={isOpen} onClose={closeDialog}>
        <SelectOptions
          data={data}
          setSelectedItem={setSelectedItem}
          selectLabel={selectLabel}
          closeModal={closeModal}
        />
      </Dialog>
      <Pressable onPress={openModal}>
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

export default SelectMenu
