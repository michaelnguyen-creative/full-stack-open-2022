import { Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel } from '@mui/material'
import { FieldProps, Field } from 'formik'

const FormikRadios = ({ field, ...props }: FieldProps) => (
  <RadioGroup {...field} {...props} />
)

export const HealthcareTypeRadios = () => {
  return (
    <>
      <FormLabel>Healthcare Categories</FormLabel>
      <Field
        name="type"
        row
        component={FormikRadios}
      >
        <FormControlLabel value="HealthCheck" control={<Radio />} label="Check" />
        <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="Occupational" />
        <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
      </Field>
    </>
  )
}

