import notifReducer from './notifReducer'
import deepFreeze from 'deep-freeze'

describe('notifReducer', () => {
  test('returns new state with action notif/addMessage', () => {
    const state = []
    const action = {
      type: 'notif/addMessage',
      payload: {
        message: 'Successfully added new anecdote'
      }
    }
    const newState = notifReducer(state, action)
    deepFreeze(newState)
    
    expect(newState.map(s => s.message)).toContain('Successfully added new anecdote')
  })

  test('returns empty string as new state with action notif/removeMessage', () => {
    const state = []
    const action = {
      type: 'notif/removeMessage',
    }
    const newState = notifReducer(state, action)
    deepFreeze(newState)
    
    expect(newState).toContain('')
  })
})