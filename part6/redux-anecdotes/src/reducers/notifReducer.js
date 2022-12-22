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

export const { addMessage, removeMessage } = notifSlice.actions
export default notifSlice.reducer
