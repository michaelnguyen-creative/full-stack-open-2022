import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
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
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'

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

  const renderUsers = (blogs) => {
    const usersWithBlogCounts = blogs.reduce((acc, { user }) => {
      const currCount = acc[user.name] ? acc[user.name] : 0
      return { ...acc, [user.name]: currCount + 1 }
    }, {})
    const users = Object.entries(usersWithBlogCounts)

    return (
      <>
        <div>
          <h1>Users</h1>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user[0]}>
                  <td>{user[0]}</td>
                  <td>{user[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }

  return (
    <div>
      <BrowserRouter>
        {user === null ? (
          <>
            <Notif message={message} />
            <LoginForm login={handleLogin} />
          </>
        ) : (
          <>
            <Notif message={message} />
            <Routes>
              <Route
                path="/users"
                element={
                  <>
                    <UserBlogs user={user} handleLogout={handleLogout} />
                    {renderUsers(blogs)}
                  </>
                }
              />
            </Routes>
            <Togglable buttonLabel="new blog">
              <BlogForm createBlog={addNewBlog} />
            </Togglable>
            <div className="blog-list">
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateLike={incrementLike}
                  deleteBlog={deleteBlogById}
                />
              ))}
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App
