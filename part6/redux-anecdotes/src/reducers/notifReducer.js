import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notif',
  initialState: '',
  reducers: {
    addMessage(state, action) {
      return action.payload
    },
    removeMessage(state, action) {
      return ''
    }
  }
})

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(removeMessage())
    dispatch(addMessage(message))
    setTimeout(() => dispatch(removeMessage()), duration * 1000)
  }
}

export const { addMessage, removeMessage } = notifSlice.actions
export default notifSlice.reducer
