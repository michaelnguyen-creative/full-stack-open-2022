import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

const LogUser = ({ handleLogout }) => {
  const user = useSelector(({ user }) => user)
  if (!user) {
    return <Button color="inherit" component={Link} to="/login">login</Button>
  }

  return (
    <>
      <Typography>{`${user.name} logged in`}</Typography>
      <Button className="logout" onClick={handleLogout} color="inherit" variant="outlined">
        logout
      </Button>
    </>
  )
}

LogUser.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default LogUser
