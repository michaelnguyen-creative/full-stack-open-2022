import { Button, TextInput, View } from 'react-native'
import { Formik, ErrorMessage, useField } from 'formik'
import * as yup from 'yup'
import { Typography } from './styledComponents'

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  return (
    <View>
      <TextInput
        style={{
          borderColor: !meta.error ? 'grey' : '#d73a4a',
          borderStyle: 'solid',
          borderWidth: 1,
          padding: '2%',
          marginBottom: '3%',
          borderRadius: 5,
          flex: 1,
          fontFamily: 'System'
        }}
        name={field.name}
        onChangeText={(text) => helpers.setValue(text)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      <ErrorMessage name={field.name}>
        {(error) => <Typography variant='caption' sx={{ flex: 0, marginBottom: '3%', marginLeft: '3%', color: '#d73a4a' }}>{error}</Typography>}
      </ErrorMessage>
    </View>
  )
}

const SignInForm = ({ handleSubmit, }) => {
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username has to be at least three characters long'),
  password: yup.string().required('Password is required'),
})

const SignIn = () => {
  const signin = (values) => {
    console.log('signin/values', values)
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signin}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <SignInForm handleSubmit={handleSubmit} />
      )}
    </Formik>
  )
}

export default SignIn
