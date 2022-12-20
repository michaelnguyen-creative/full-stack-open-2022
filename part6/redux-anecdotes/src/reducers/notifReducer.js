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
    }
  }
})

export const { addMessage } = notifSlice.actions
export default notifSlice.reducer
