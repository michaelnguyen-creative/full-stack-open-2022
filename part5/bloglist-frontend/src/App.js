import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notif from './components/Notif'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Set up subscription to database
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

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
    } catch (exception) {
      console.log('exception', exception.response.data.error)
      setMessage(`error: ${exception.response.data.error}`)
      setTimeout(() => setMessage(''), 5000)
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
      const createdBlog = await blogService.create(blogObj)
      // blogService.
      console.log('created blog', createdBlog)
      setBlogs(blogs.concat(createdBlog))
      setMessage(
        `successfully created ${createdBlog.title} by ${createdBlog.author}`
      )
      setTimeout(() => setMessage(''), 5000)
    } catch (exception) {
      console.log('excpt', exception)
      setMessage(`error: ${exception.response.data.error}`)
      setTimeout(() => setMessage(''), 5000)
    }
  }

  // Error handler needed
  const incrementLike = async (objToUpdate) => {
    await blogService.update(objToUpdate)
  }
  // Error handler needed
  const deleteBlogById = async (blogId) => {
    try {
      console.log('blog id', blogId)
      await blogService.remove(blogId)
      setBlogs(blogs.filter((b) => b.id !== blogId))
      // message needed
      setMessage(
        `deleted blog ${blogId} successfully`
      )
      setTimeout(() => setMessage(''), 5000)
    } catch (exception) {
      console.log('excpt', exception)
      setMessage(`error: ${exception.response.data.error}`)
      setTimeout(() => setMessage(''), 5000)
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

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={incrementLike}
              deleteBlog={deleteBlogById}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
