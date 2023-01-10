import PropTypes from 'prop-types'
import { Alert } from '@mui/material'

const Notif = ({ message }) => {
  return (
    <div className="notif" style={{ display: !message ? 'none' : '' }}>
      <Alert severity={/^error/.test(message) ? 'error' : 'success'}>
        {message}
      </Alert>
    </div>
  )
}

Notif.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Notif
