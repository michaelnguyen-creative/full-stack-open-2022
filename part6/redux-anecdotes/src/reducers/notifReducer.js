import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  'Initial notif message'
]

const notifSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.push(action.payload)
    },
    removeMessage(state, action) {
      state.push('')
    }
  }
})

export const { addMessage, removeMessage } = notifSlice.actions
export default notifSlice.reducer
