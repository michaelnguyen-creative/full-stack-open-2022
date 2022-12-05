import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notif from './components/Notif'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('Notif')

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
    setTitle('')
    setAuthor('')
    setUrl('')
    console.log('logged out')
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url,
      }
      const createdBlog = await blogService.create(newBlog)
      // blogService.
      console.log('created blog', createdBlog)
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage(`successfully created ${createdBlog.title} by ${createdBlog.author}`)
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
          <BlogForm
            addNewBlog={addNewBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
