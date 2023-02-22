import { Button, TextInput, View } from 'react-native'
import { Formik, useField } from 'formik'

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  return (
    <TextInput
      style={{
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: '2%',
        marginBottom: '3%',
        borderRadius: 5,
      }}
      name={field.name}
      onChangeText={(text) => helpers.setValue(text)}
      {...props}
    />
  )
}

const SignInForm = ({ handleSubmit }) => {
  return (
    <View style={{ padding: '5%' }}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Button
        style={{ borderRadius: 5 }}
        title="Sign in"
        onPress={handleSubmit}
      />
    </View>
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
