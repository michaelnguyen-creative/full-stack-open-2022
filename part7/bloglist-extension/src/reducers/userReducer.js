import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    }
  }
})

export const { addUser, removeUser } = userReducer.actions

export const logIn = (userObj) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(userObj)
    dispatch(addUser(loggedUser))
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    blogService.setToken(loggedUser.token)
  }
}

export const logOut = () => {
  return
}

export default userReducer.reducer