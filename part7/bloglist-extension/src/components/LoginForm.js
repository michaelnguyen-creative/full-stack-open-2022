import { useField } from '../hooks/index'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleLogin = (e) => {
    e.preventDefault()
    login({
      username: username.value,
      password: password.value,
    })
    resetUsername()
    resetPassword()
  }

  return (
    <form onSubmit={handleLogin}>
      <h3>Log in to app</h3>
      <div>
        <label htmlFor="username-input">username</label>
        <input
          id="username-input"
          {...username}
        />
      </div>
      <div>
        <label htmlFor="password-input">password</label>
        <input
          id="password-input"
          {...password}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm