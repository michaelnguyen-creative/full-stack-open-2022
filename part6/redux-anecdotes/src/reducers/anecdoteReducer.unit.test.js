import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'

describe('anecdoteReducer', () => {
  test('returns new state with action INCREMENT_VOTE', () => {
    const state = [{
      content: 'test',
      id: 0,
      votes: 0
    }]
    const action = {
      type: 'INCREMENT_VOTE',
      data: {
        id: 0
      }
    }

    // Make state obj immutable
    deepFreeze(state)
    const newState = reducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual({
      content: 'test',
      id: 0,
      votes: 1
    })
  })

  test.only('adds new anecdote returns new state with correct details', () => {
    const state = [{
      content: 'test',
      id: 0,
      votes: 0
    }]
    const action = {
      type: 'ADD_NEW',
      data: {
        content: 'new anecdote',
        id: 1,
        votes: 0
      }
    }

    deepFreeze(state)
    const newState = reducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState[1].content).toBe('new anecdote')
  })
})