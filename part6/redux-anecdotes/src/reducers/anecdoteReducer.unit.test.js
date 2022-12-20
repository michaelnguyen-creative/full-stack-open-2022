import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdoteReducer', () => {
  test('returns new state with action anecdotes/incrementVote', () => {
    const state = [{
      content: 'test',
      id: 0,
      votes: 0
    }]
    const action = {
      type: 'anecdotes/incrementVote',
      payload: 0
    }

    // Make state obj immutable
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    console.log('state', newState)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
      content: 'test',
      id: 0,
      votes: 1
    })
  })

  test.only('returns new state with correct details with action anecdotes/addNew', () => {
    const state = [{
      content: 'test',
      id: 0,
      votes: 0
    }]
    const action = {
      type: 'anecdotes/addNew',
      payload: {
        content: 'new anecdote',
        id: 1,
        votes: 0
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState[1].content.content).toBe('new anecdote')
  })
})