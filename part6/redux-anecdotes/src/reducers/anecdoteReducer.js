import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    incrementVote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id !== action.payload) {
          return anecdote
        }
        return {...anecdote, votes: anecdote.votes + 1}
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, incrementVote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const returnedAnecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(returnedAnecdotes))
  }
}

export const addNew = (content) => {
  return async (dispatch) => {
    const addedAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(addedAnecdote))
  }
}

export default anecdoteSlice.reducer
