import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    login({
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
        <label htmlFor="username-input">username</label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password-input">password</label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm