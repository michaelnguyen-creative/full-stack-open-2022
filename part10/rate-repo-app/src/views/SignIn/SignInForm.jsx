import { Button, View } from 'react-native'
import FormikTextInput from '../../components/forms/TextField/FormikTextInput'

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