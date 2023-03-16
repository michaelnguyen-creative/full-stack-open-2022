import { TextInput, View } from 'react-native'
import { ErrorMessage, useField } from 'formik'
import { Typography } from '../Typography.styles'

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
        onKeyPress={(e) => console.log('e', e)}
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

export default FormikTextInput
