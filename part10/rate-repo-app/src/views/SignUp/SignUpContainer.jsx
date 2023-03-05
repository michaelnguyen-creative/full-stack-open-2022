import { FormikUserBaseForm, FormikTextInput } from '../../components/forms'
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
      .oneOf([Yup.ref('password')], "Confirm has to match password")
      .required('Password confirm is required'),
  })

  return (
    <FormikUserBaseForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      formTitle="Sign up"
    >
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Confirm"
        secureTextEntry
      />
    </FormikUserBaseForm>
  )
}

export default SignUpContainer
