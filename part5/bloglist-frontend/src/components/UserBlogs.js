const UserBlogs = ({ user, handleLogout }) => (
  <div>
    <h2>Blogs</h2>
    <div>
      {`${user.name} logged in`}
      <input type="submit" value="logout" onClick={handleLogout} />
    </div>
    {/* Blogs associated with logged user / all blogs */}
    <div>
    </div>
  </div>
)

export default UserBlogs