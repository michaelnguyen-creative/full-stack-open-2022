import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import Blog from './components/Blog'
import Notif from './components/Notif'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import Togglable from './components/Togglable'
import {
  initializeBlogs,
  createBlog,
  updateLike,
  deleteBlog,
} from './reducers/blogReducer'
import { logIn, logOut } from './reducers/userReducer'
import { BrowserRouter, Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import UsersView from './components/UsersView'
import SingleUserView from './components/SingleUserView'
import BlogView from './components/Blog'

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const message = useSelector(({ message }) => message)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

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
  }

  return (
    <div>
      <BrowserRouter>
        <Notif message={message} />
        <div>
          <Link to="users">Users</Link>
          <Link to="/">Home</Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div style={{ display: user === null ? '' : 'none' }}>
                  <LoginForm login={handleLogin} />
                </div>
                <div style={{ display: user === null ? 'none' : '' }}>
                  <UserBlogs user={user} handleLogout={handleLogout} />
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
            path="/users"
            element={
              <>
                <UserBlogs handleLogout={handleLogout} />
                <UsersView />
              </>
            }
          >
            <Route
              path=":userId"
              element={
                <>
                  <UserBlogs handleLogout={handleLogout} />
                  <SingleUserView />
                </>
              }
            />
          </Route>
          <Route
            path="/blogs/:blogId"
            element={
              <>
                <BlogView
                  updateLike={incrementLike}
                  deleteBlog={deleteBlogById}
                />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
