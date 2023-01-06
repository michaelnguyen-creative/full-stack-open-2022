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
      {user === null ? (
        <>
          <Notif message={message} />
          <LoginForm login={handleLogin} />
        </>
      ) : (
        <>
          <Notif message={message} />
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
        </>
      )}
    </div>
  )
}

export default App
