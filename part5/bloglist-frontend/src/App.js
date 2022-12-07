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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Set up subscription to database
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserData')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // Send post requests to backend
    // Prepare data to be sent to the backend
    try {
      const userLoginData = {
        username,
        password,
      }
      console.log(`logging in with ${username} ${password}`)
      // We need an Axios service component for this
      const loggedUser = await loginService.login(userLoginData)
      console.log('logged user', loggedUser)

      window.localStorage.setItem('loggedUserData', JSON.stringify(loggedUser))
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      blogService.setToken(loggedUser.token)
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
    setUsername('')
    setPassword('')
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

  const incrementLike = async (objToUpdate) => {
    blogService.update(objToUpdate)
  }

  return (
    <div>
      {user === null ? (
        <>
          <Notif message={message} />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </>
      ) : (
        <>
          <Notif message={message} />
          <UserBlogs user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel="new blog">
            <BlogForm
              createBlog={addNewBlog}
            />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updateLike={incrementLike} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
