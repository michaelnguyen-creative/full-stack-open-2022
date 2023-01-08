import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LogUser = ({ handleLogout }) => {
  const user = useSelector(({ user }) => user)
  if (!user) {
    return <Link to="/login">login</Link>
  }

  return (
    <>
      {`${user.name} logged in`}
      <button className="logout" onClick={handleLogout}>
        logout
      </button>
    </>
  )
}

LogUser.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default LogUser
