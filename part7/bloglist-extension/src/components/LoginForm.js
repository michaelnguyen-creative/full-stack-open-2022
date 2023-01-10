import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
import { Grid, TextField, Button } from '@mui/material'

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
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField label="username" id="username-input" {...username} />
        </Grid>
        <Grid item>
          <TextField label="password" id="password-input" {...password} />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">login</Button>
        </Grid>
      </Grid>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm
