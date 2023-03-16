import { FormikTextInput } from '../../components/Formik/FormikTextInput'
import { FormikBaseForm } from '../../components/Formik/FormikBaseForm'
import * as Yup from 'yup'

const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required').min(1).max(30),
    password: Yup.string().required('Password is required').min(5).max(50),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], 'Confirm has to match password')
      .required('Password confirm is required'),
  })

  return (
    <FormikBaseForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      submitButtonLabel="Sign up"
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
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Confirm"
        secureTextEntry
      />
    </FormikBaseForm>
  )
}

export default SignUpContainer
