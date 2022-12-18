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
})