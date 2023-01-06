import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: notifReducer,
    user: userReducer,
  },
})

export default store
