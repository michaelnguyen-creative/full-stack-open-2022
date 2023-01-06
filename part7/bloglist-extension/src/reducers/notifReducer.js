import { createSlice } from '@reduxjs/toolkit'

const notifReducer = createSlice({
  name: 'notif',
  initialState: '',
  reducers: {
    addMessage(state, action) {
      return action.payload
    },
    removeMessage() {
      return ''
    }
  }
})

export const { addMessage, removeMessage } = notifReducer.actions

export const displayMessageForSomeTime = (message, durationInMs) => {
  return async (dispatch) => {
    dispatch(addMessage(message))
    setTimeout(() => dispatch(removeMessage()), durationInMs)
  }
}

export default notifReducer.reducer