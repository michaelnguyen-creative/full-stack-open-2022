import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // Send post requests to backend
    // Prepare data to be sent to the backend
    const userLoginData = {
      username, 
      password,
    }
    console.log(`logging in with ${username} ${password}`)
    // We need an Axios service component for this
    const loggedUser = await loginService.login(userLoginData)
    console.log('logged user', loggedUser)
    
    setUser(loggedUser)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to app</h2>
      <div>
        username
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="text" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const userBlog = () => (
    <div>
      <h2>Blogs</h2>
      <p>{`${user.name} logged in`}</p>
      {/* Blogs associated with logged user */}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
  return (
    <div>
      {user === null 
        ? loginForm()
        : userBlog()
      }
    </div>
  )
}

export default App
