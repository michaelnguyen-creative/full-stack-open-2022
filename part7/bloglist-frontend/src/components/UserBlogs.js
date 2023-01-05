import PropTypes from 'prop-types'

const UserBlogs = ({ user, handleLogout }) => (
  <div>
    <h2>Blogs</h2>
    <div>
      {`${user.name} logged in`}
      <button className='logout' onClick={handleLogout}>logout</button>
    </div>
    {/* Blogs associated with logged user / all blogs */}
    <div>
    </div>
  </div>
)

UserBlogs.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default UserBlogs