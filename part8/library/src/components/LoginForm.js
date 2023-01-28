import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useField } from '../hooks/index'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const { reset: usernameReset, ...username } = useField('text')
  const { reset: passwordReset, ...password } = useField('password')
  const [login, loginResult] = useMutation(LOGIN)

  useEffect(() => {
    if (loginResult.data) {
      const token = loginResult.data.login.value
      localStorage.setItem('userToken', token)
      setToken(token)
    }
    localStorage.getItem('userToken') && setToken(localStorage.getItem('userToken'))
    setPage('authors')
  }, [loginResult.data, setToken, setPage])

  const submit = (e) => {
    e.preventDefault()
    login({
      variables: {
        username: username.value,
        password: password.value
      }
    })
    passwordReset()
    usernameReset()
  }


  if (!show) return null

  return (
    <div>
      <form onSubmit={submit}>
        <div>username<input {...username} /></div>
        <div>password<input {...password} /></div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
