import { Button, TextInput, View } from 'react-native'
import { ErrorMessage, useField } from 'formik'
import { Typography } from '../styledComponents'

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
          fontFamily: 'System',
        }}
        name={field.name}
        onChangeText={(text) => helpers.setValue(text)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      <ErrorMessage name={field.name}>
        {(error) => (
          <Typography
            variant="caption"
            sx={{
              flex: 0,
              marginBottom: '3%',
              marginLeft: '3%',
              color: '#d73a4a',
            }}
          >
            {error}
          </Typography>
        )}
      </ErrorMessage>
    </View>
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

export default SignInForm