import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notif from './components/Notif'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import Togglable from './components/Togglable'

import { initializeBlogs, createBlog, updateLike, deleteBlog } from './reducers/blogReducer'
import { logIn } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector(({ message }) => message)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = async (userObj) => {
    try {
      dispatch(logIn(userObj))
      dispatch({ type: 'notif/addMessage', payload: `user ${userObj.name} logged in` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
    } catch (exception) {
      console.log('exception', exception.response.data.error)
      dispatch({ type: 'notif/addMessage', payload: `error: ${exception.response.data.error}` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedUserData')
    console.log('logged out')
  }

  const addNewBlog = async (blogObj) => {
    try {
      dispatch(createBlog(blogObj))
      dispatch({ type: 'notif/addMessage', payload: `successfully created ${blogObj.title} by ${blogObj.author}` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
    } catch (exception) {
      dispatch({ type: 'notif/addMessage', payload: `error: ${exception.response.data.error}` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
    }
  }

  const incrementLike = async (blogObj) => {
    dispatch(updateLike(blogObj))
    dispatch(initializeBlogs())
  }

  const deleteBlogById = async (blogId) => {
    try {
      dispatch(deleteBlog(blogId))
      dispatch({ type: 'notif/addMessage', payload: `deleted blog ${blogId} successfully` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
    } catch (exception) {
      console.log('excpt', exception)
      dispatch({ type: 'notif/addMessage', payload: `error: ${exception.response.data.error}` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
    }
  }

  return (
    <div>
      {user === null ? (
        <>
          <Notif message={message} />
          <LoginForm loginUser={handleLogin} />
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
                loggedUser={user.name}
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
