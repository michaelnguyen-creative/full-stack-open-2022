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

export const { addMessage, removeMessage } = notifReducer
export default notifReducer.reducer