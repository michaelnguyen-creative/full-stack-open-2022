import { useState, useEffect } from 'react'
import { Pressable, View } from 'react-native'
import { useRepositories } from '../../../hooks/useRepositories'

import Dialog from '../../../components/Dialog'
import { Typography } from '../../../components/texts/Typography.styles'
import SelectOptions from '../../../components/Select/SelectOptions'

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

  return (
    <>
      <Dialog isOpen={isOpen} onClose={closeDialog}>
        <SelectOptions
          data={data}
          setSelectedItem={setSelectedItem}
          selectLabel={selectLabel}
          closeDialog={closeDialog}
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

export default SortingSelection