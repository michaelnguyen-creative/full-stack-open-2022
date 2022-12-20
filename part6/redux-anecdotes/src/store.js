import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    message: notifReducer,
  }
})

export default store
