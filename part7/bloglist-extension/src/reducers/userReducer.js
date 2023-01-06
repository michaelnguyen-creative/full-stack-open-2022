import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayMessageForSomeTime } from './notifReducer'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { addUser, removeUser } = userReducer.actions

export const logIn = (userObj) => {
  return async (dispatch) => {
    let loggedUser
    try {
      loggedUser = await loginService.login(userObj)
    } catch (error) {
      dispatch(
        displayMessageForSomeTime(`error: ${error.response.data.error}`, 5000)
      )
      return
    }
    dispatch(addUser(loggedUser))
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    blogService.setToken(loggedUser.token)
    dispatch(
      displayMessageForSomeTime(
        `user ${loggedUser.name} have just logged in`,
        5000
      )
    )
  }
}

export const logOut = () => {
  return async (dispatch) => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedUser')
  }
}

export default userReducer.reducer
