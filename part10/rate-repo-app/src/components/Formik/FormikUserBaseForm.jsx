import { Formik } from 'formik'
import { View, Button } from 'react-native'
import { FormikTextInput } from '../index'

const FormikUserBaseForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  formTitle,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...(validationSchema ? (validationSchema = { validationSchema }) : '')}
    >
      {({ handleSubmit }) => (
        <View style={{ padding: '5%' }}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            onPressEnter={handleSubmit}
          />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            onPressEnter={handleSubmit}
          />
          {children}
          <Button
            style={{ borderRadius: 5 }}
            title={formTitle}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

export default FormikUserBaseForm
