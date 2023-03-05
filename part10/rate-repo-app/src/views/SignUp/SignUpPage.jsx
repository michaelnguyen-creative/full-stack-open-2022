import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../graphql/mutations'
import { useSignIn } from '../../hooks/useSignin'
import { useNavigate } from 'react-router-native'

import SignUpContainer from "./SignUpContainer";

const SignUpPage = () => {
  const [createUser, ] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const handleSignUp = async ({ username, password }) => {
    try {
      console.log('signing up with', username, password)
      const createdUser = await createUser({
        variables: { user: { username, password } }
      })
      console.log('created user', createdUser)

      console.log('now signing user in')
      await signIn({ username, password })

      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (<SignUpContainer onSubmit={handleSignUp} />)
}

export default SignUpPage
