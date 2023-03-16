import { Formik } from 'formik'
import { View, Button } from 'react-native'

export const FormikBaseForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  submitButtonLabel,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      {...(validationSchema ? (validationSchema = { validationSchema }) : '')}
    >
      {({ handleSubmit }) => (
        <View style={{ padding: '5%' }}>
          {children}
          <Button
            style={{ borderRadius: 5 }}
            title={submitButtonLabel}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  )
}

