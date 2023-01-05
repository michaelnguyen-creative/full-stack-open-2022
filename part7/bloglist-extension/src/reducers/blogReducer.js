import { createSlice } from '@reduxjs/toolkit'

const blogReducer = createSlice({
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
    removeBlog(state, action) {
      return state.filter((blogs) => blogs.id !== action.payload)
    }
  }
})

export const { addNew, incrementLike, removeBlog } = blogReducer.actions
export default blogReducer.reducer
