import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filterReducer', () => {
  test('returns new state with action filter/setFilter', () => {
    const state = []
    const action = {
      type: 'filter/setFilter',
      payload: 'A'
    }
    const newState = filterReducer(state, action)
    deepFreeze(newState)
    
    expect(newState).toBe('A')
  })
})
