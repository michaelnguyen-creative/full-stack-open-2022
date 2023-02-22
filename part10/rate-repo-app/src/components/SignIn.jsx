import { Text, Button, TextInput } from 'react-native'
import { Formik, useField } from 'formik'

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  return (
    <TextInput
      name={field.name}
      onChangeText={(text) => helpers.setValue(text)}
      {...props}
    />
  )
}

const SignInForm = ({ handleSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username')
  const [pswdField, pswdMeta, pswdHelpers] = useField('password')
  return (
    <>
      <TextInput
        placeholder="Username"
        name={usernameField.name}
        onChangeText={(text) => usernameHelpers.setValue(text)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        name={pswdField.name}
        secureTextEntry
        onChangeText={(text) => pswdHelpers.setValue(text)}
      ></TextInput>
      <Button title="Sign in" onPress={handleSubmit} />
    </>
  )
}

const initialValues = {
  username: '',
  password: '',
}
const SignIn = () => {
  const signin = (values) => {
    console.log('signin/values', values)
  }
  return (
    <Formik initialValues={initialValues} onSubmit={signin}>
      {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
