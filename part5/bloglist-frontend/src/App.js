import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import UserBlogs from './components/UserBlogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
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
    } catch (exception) {}
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedUserData')
    setUser(null)
    console.log('logged out')
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <UserBlogs user={user} handleLogout={handleLogout} blogs={blogs} />
      )}
    </div>
  )
}

export default App
