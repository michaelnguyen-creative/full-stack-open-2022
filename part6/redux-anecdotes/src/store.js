import { configureStore } from '@reduxjs/toolkit'
import anecReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notifReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecReducer,
    message: notifReducer,
  }
})

export default store
