import { useState } from "react"

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

export default LoginForm