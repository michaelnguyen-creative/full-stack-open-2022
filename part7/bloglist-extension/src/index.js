import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import blogReducer from './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: notifReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
