import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { displayMessageForSomeTime } from './notifReducer'

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
    let createdBlog
    try {
      createdBlog = await blogService.create(blogObj)
    } catch (error) {
      dispatch(displayMessageForSomeTime(`error: ${error.response.data.error}`, 5000))
      return
    }
    dispatch(appendBlog(createdBlog))
    dispatch(displayMessageForSomeTime(`successfully created ${blogObj.title} by ${blogObj.author}`, 5000))
  }
}

export const updateLike = (blogObj) => {
  return async (dispatch) => {
    try {
      await blogService.update(blogObj)
    } catch (error) {
      dispatch(displayMessageForSomeTime(`error: ${error.response.data.error}`, 5000))
      return
    }
    dispatch(incrementLike(blogObj))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
    } catch (error) {
      dispatch(displayMessageForSomeTime(`error: ${error.response.data.error}`, 5000))
      return
    }
    dispatch(removeBlog(id))
    dispatch(displayMessageForSomeTime(`blog ${id} has been deleted successfully`, 5000))
  }
}

export default blogReducer.reducer
