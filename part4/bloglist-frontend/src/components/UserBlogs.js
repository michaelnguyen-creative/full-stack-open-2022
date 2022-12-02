import Blog from './Blog'

const UserBlogs = ({ user, handleLogout, blogs }) => (
  <div>
    <h2>Blogs</h2>
    <div>
      {`${user.name} logged in`}
      <input type="submit" value="logout" onClick={handleLogout} />
    </div>
    {/* Blogs associated with logged user / all blogs */}
    <div>
      {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
    </div>
  </div>
)

export default UserBlogs