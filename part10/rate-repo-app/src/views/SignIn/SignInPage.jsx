import { useNavigate } from 'react-router-native'

import SignInContainer from './SignInContainer'
import { useSignIn } from '../../hooks/useSignin'

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const handleSignIn = async ({ username, password }) => {
    try {
      await signIn({ username, password })
      navigate('/')
    } catch (error) {
      console.log('error', error)
    }
  }

  return <SignInContainer onSubmit={handleSignIn} />
}

export default SignIn
