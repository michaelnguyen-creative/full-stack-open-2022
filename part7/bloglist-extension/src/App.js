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
import { BrowserRouter, Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import SingleUserView from './components/SingleUserView'

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
      const currCount = acc[[user.name, user.userId]] ?? 0
      return { ...acc, [[user.name, user.userId]]: currCount + 1 }
    }, {})

    const usersArrayFromObj = Object.entries(usersWithBlogCounts)
    const users = usersArrayFromObj.map((user) => [
      ...user[0].split(','),
      user[1],
    ])

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
                <tr key={user[1]}>
                  <td>
                    <Link to={user[1]}>{user[0]}</Link>
                  </td>
                  <td>{user[2]}</td>
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
        <Notif message={message} />
        <div>
          <Link to="users">Users</Link>
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
                </div>
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <UserBlogs user={user} handleLogout={handleLogout} />
                {renderUsers(blogs)}
              </>
            }
          />
          <Route
            path="/users/:userId"
            element={<SingleUserView />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
