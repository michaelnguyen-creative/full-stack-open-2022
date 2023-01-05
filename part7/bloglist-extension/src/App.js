import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notif from './components/Notif'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, updateLike } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const blogs = useSelector((state) => state.blogs)
  const message = useSelector(({ message }) => message)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserData')
    if (loggedUserJSON) {
      const userLocal = JSON.parse(loggedUserJSON)
      blogService.setToken(userLocal.token)
      setUser(userLocal)
    }
  }, [])

  const handleLogin = async (userObj) => {
    // Send post requests to backend
    // Prepare data to be sent to the backend
    try {
      console.log(`logging in with ${userObj.username} ${userObj.password}`)
      // We need an Axios service component for this
      const loggedUser = await loginService.login(userObj)
      console.log('logged user', loggedUser)

      window.localStorage.setItem('loggedUserData', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      dispatch({ type: 'notif/addMessage', payload: `user ${loggedUser.name} logged in` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
    } catch (exception) {
      console.log('exception', exception.response.data.error)
      dispatch({ type: 'notif/addMessage', payload: `error: ${exception.response.data.error}` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
      // setMessage(`error: ${exception.response.data.error}`)
      // setTimeout(() => setMessage(''), 5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedUserData')
    setUser(null)
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

  // Error handler needed
  const incrementLike = async (blogObj) => {
    dispatch(updateLike(blogObj))
    dispatch(initializeBlogs())
  }

  // Error handler needed
  const deleteBlogById = async (blogId) => {
    try {
      console.log('blog id', blogId)
      await blogService.remove(blogId)
      // TODO:
      // setBlogs(blogs.filter((b) => b.id !== blogId))
      // message needed
      dispatch({ type: 'notif/addMessage', payload: `deleted blog ${blogId} successfully` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
      // setMessage(`deleted blog ${blogId} successfully`)
      // setTimeout(() => setMessage(''), 5000)
    } catch (exception) {
      console.log('excpt', exception)
      dispatch({ type: 'notif/addMessage', payload: `error: ${exception.response.data.error}` })
      setTimeout(() => dispatch({ type: 'notif/removeMessage' }), 5000)
    //   setMessage(`error: ${exception.response.data.error}`)
    //   setTimeout(() => setMessage(''), 5000)
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
