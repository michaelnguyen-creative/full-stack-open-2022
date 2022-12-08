import PropTypes from 'prop-types'

const Notif = ({ message }) => {
  const noStyle = {}
  const successStyle = {
    backgroundColor: '#A8E10C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  const failedStyle = {
    backgroundColor: '#FF5765',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  return (
  <div style={(!message) ? noStyle : /^error/.test(message) ? failedStyle : successStyle}>
    <p>{message}</p>
  </div>
)}

Notif.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Notif