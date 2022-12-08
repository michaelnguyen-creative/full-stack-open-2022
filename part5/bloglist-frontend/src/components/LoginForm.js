import { useState } from "react"
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    loginUser({
      username,
      password,
    })

    setUsername('')
    setPassword('')
  }

  return (
  <form onSubmit={handleLogin}>
    <h2>Log in to app</h2>
    <div>
      username
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm