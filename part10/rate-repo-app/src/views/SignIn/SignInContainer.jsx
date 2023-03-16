import * as yup from 'yup'
import { FormikBaseForm } from '../../components/Formik/FormikBaseForm'
import { FormikTextInput } from '../../components/Formik/FormikTextInput'

const SignInContainer = ({ onSubmit }) => {
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

  return (
    <FormikBaseForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      submitButtonLabel="Sign in"
    >
      <FormikTextInput
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
      />
    </FormikBaseForm>
  )
}

export default SignInContainer
