import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notif from './components/Notif'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogUser from './components/LogUser'
import Togglable from './components/Togglable'
import {
  initializeBlogs,
  createBlog,
  updateLike,
  deleteBlog,
} from './reducers/blogReducer'
import { logIn, logOut } from './reducers/userReducer'
import { Link, NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import UsersView from './components/UsersView'
import SingleUserView from './components/SingleUserView'
import SingleBlogView from './components/SingleBlogView'

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const message = useSelector(({ message }) => message)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Clear localStorage data if there is any
    window.localStorage.clear()
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = (userObj) => {
    dispatch(logIn(userObj))
  }

  const handleLogout = () => {
    dispatch(logOut())
    navigate('/')
  }

  const addNewBlog = (blogObj) => {
    dispatch(createBlog(blogObj))
  }

  const incrementLike = async (blogObj) => {
    dispatch(updateLike(blogObj))
    dispatch(initializeBlogs())
  }

  const deleteBlogById = async (blogId) => {
    dispatch(deleteBlog(blogId))
    navigate('/blogs')
  }

  return (
    <div>
      <Notif message={message} />
      <nav>
        <div>
          <NavLink to="users">Users</NavLink>
          <NavLink to="blogs">Blogs</NavLink>
          <LogUser handleLogout={handleLogout} />
        </div>
      </nav>
      <h1>Blog app</h1>
      <Routes>
        <Route path="/" element={<p>Home Page</p>} />
        <Route
          path="/login"
          element={
            <>
              <div style={{ display: user === null ? '' : 'none' }}>
                <LoginForm login={handleLogin} />
              </div>
              <div style={{ display: user === null ? 'none' : '' }}>
                <Togglable buttonLabel="new blog">
                  <BlogForm createBlog={addNewBlog} />
                </Togglable>
                <ul className="blog-list">
                  {blogs.map((blog) => (
                    <li key={blog.id}>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <div>
              <Togglable buttonLabel="new blog">
                <BlogForm createBlog={addNewBlog} />
              </Togglable>
              <ul className="blog-list">
                {blogs.map((blog) => (
                  <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
        <Route
          path="/blogs/:blogId"
          element={
            <SingleBlogView
              updateLike={incrementLike}
              deleteBlog={deleteBlogById}
            />
          }
        />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:userId" element={<SingleUserView />} />
      </Routes>
    </div>
  )
}

export default App
