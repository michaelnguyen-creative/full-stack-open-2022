import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { addNew, incrementLike, removeBlog, setBlogs } = blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const initialBlogs = await blogService.getAll()
    dispatch(setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes)))
  }
}

export default blogReducer.reducer
