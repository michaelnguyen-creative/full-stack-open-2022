import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const reducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addNew(state, action) {
      state.push(action.payload)
    },
    incrementLike(state, action) {
      const objToUpdate = state.find((obj) => obj.id === action.payload)
      objToUpdate.likes += 1
    },
    delete(state, action) {
      return state.filter((blogs) => blogs.id !== action.payload)
    }
  }
})

const store = configureStore({
  reducer
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
