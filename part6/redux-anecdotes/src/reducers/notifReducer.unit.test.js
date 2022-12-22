import notifReducer from './notifReducer'
import deepFreeze from 'deep-freeze'

describe('notifReducer', () => {
  test('returns new state with action notif/addMessage', () => {
    const state = ''
    const action = {
      type: 'notif/addMessage',
      payload: 'Successfully added new anecdote'
    }

    const newState = notifReducer(state, action)
    deepFreeze(newState)
    
    expect(newState).toBe('Successfully added new anecdote')
  })

  test.only('returns empty string as new state with action notif/removeMessage', () => {
    const state = ''
    const action = {
      type: 'notif/removeMessage',
    }
    const newState = notifReducer(state, action)
    deepFreeze(newState)
    
    expect(newState).toBe('')
  })
})