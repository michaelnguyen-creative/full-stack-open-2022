import { useState } from 'react'
import { Pressable, View, Modal } from 'react-native'
import { Typography } from '../texts/Typography.styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import SelectOptions from './SelectOptions'

import { useEffect } from 'react'
import { useRepositories } from '../../hooks/useRepositories'

const SelectModal = ({ data, onSelect, selectLabel }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(data[0])
  const [getRepositories] = useRepositories(selectedItem.value)

  useEffect(() => {
    onSelect(getRepositories)
  }, [selectedItem])

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Modal
          visible={isOpen}
          animationType="fade"
          transparent
          onRequestClose={closeModal}
        >
          <Pressable onPress={closeModal}>
            <View
              style={{
                width: 375,
                height: 667,
                background: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Pressable>
                <View
                  style={{
                    backgroundColor: 'whitesmoke',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5%',
                    width: 275,
                    borderRadius: '2%',
                  }}
                >
                  <SelectOptions
                    data={data}
                    setSelectedItem={setSelectedItem}
                    selectLabel={selectLabel}
                    closeModal={closeModal}
                  />
                </View>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
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

export default SelectModal
