import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { removeMessage } from '../reducers/notifReducer'

const Notification = () => {
  const message = useSelector(({ message }) => message)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => dispatch(removeMessage), 5000)
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={message ? style : { dispaly: 'none' }}>
      {message}
    </div>
  )
}

export default Notification