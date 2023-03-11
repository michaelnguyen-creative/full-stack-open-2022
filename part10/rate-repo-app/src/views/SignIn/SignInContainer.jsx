import * as yup from 'yup'

import { FormikUserBaseForm } from '../../components/index'

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
    <FormikUserBaseForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      formTitle="Sign in"
    />
  )
}

export default SignInContainer