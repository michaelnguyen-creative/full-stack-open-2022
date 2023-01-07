import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const LogUser = ({ handleLogout }) => {
  const user = useSelector(({ user }) => user)
  return (
    <>
      {`${user && user.name} logged in`}
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
