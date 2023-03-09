import { Pressable, View, Modal, StyleSheet } from 'react-native'

const Dialog = ({ isOpen, onClose, children }) => {
  return (
    <View style={styles.dialogContainer}>
      <Modal
        visible={isOpen}
        animationType="fade"
        transparent
        onRequestClose={onClose}
      >
        <Pressable onPress={onClose}>
          <View style={styles.dialogModalView}>
            <Pressable>
              <View style={styles.dialogContentView}>{children}</View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  dialogContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogModalView: {
    width: 375,
    height: 667,
    background: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    width: 275,
    borderRadius: '2%',
  },
})

export default Dialog
