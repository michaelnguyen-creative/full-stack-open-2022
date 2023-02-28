import { Formik } from 'formik'
import * as yup from 'yup'
import { useSignIn } from '../../hooks/useSignin'
import { useNavigate } from 'react-router-native'
import SignInForm from './SignInForm'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username has to be at least three characters long'),
  password: yup.string().required('Password is required'),
})

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signIn({ username, password })
      navigate('/')
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
