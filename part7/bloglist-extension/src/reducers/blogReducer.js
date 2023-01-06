import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    incrementLike(state, action) {
      const blogToUpdate = state.find((obj) => obj.id === action.payload.id)
      return state.map((blog) => blog.id !== action.payload.id ? blog : { ...blogToUpdate, likes: blogToUpdate.likes + 1 })
    },
    removeBlog(state, action) {
      return state.filter((blogs) => blogs.id !== action.payload)
    },
  }
})

export const { setBlogs, appendBlog, addNew, incrementLike, removeBlog, } = blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const initialBlogs = await blogService.getAll()
    dispatch(setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blogObj)
    dispatch(appendBlog(createdBlog))
  }
}

export const updateLike = (blogObj) => {
  return async (dispatch) => {
    await blogService.update(blogObj)
    dispatch(incrementLike(blogObj))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogReducer.reducer
