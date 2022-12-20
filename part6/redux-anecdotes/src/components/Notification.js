import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(({ message }) => message.slice(-1)[0])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={message !== '' ? style : { dispaly: 'none' }}>
      {message}
    </div>
  )
}

export default Notification