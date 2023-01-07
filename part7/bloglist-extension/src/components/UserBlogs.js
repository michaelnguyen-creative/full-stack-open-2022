import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const UserBlogs = ({ handleLogout }) => {
  const user = useSelector(({ user }) => user)
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {`${user && user.name} logged in`}
        <button className="logout" onClick={handleLogout}>
          logout
        </button>
      </div>
      <div></div>
    </div>
  )
}

UserBlogs.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default UserBlogs
