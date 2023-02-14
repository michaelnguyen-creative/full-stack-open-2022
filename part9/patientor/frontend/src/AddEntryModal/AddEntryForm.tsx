import { Formik, Form, Field } from 'formik'

import { HealthCheckRating, Diagnosis, HealthCheckEntry } from '../types'
import {
  TextField,
  SelectField,
  DiagnosisSelection,
  HealthCheckRatingOption,
} from '../AddPatientModal/FormField'

import { useStateValue } from '../state'
import { AddEntryModalProps } from './index'

import { Button, Grid } from '@mui/material'

const HealthCheckRatingOptions: HealthCheckRatingOption[] = [
  {
    value: HealthCheckRating['Healthy'],
    label: 'Healthy',
  },
  {
    value: HealthCheckRating['LowRisk'],
    label: 'Low Risk',
  },
  {
    value: HealthCheckRating['HighRisk'],
    label: 'High Risk',
  },
  {
    value: HealthCheckRating['CriticalRisk'],
    label: 'Critical Risk',
  },
]

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>

const initialValues: HealthCheckEntryFormValues = {
  description: '',
  specialist: '',
  date: '',
  diagnosisCodes: [''],
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating['Healthy'],
}

type AddEntryFormProps = Omit<AddEntryModalProps, 'dialogIsOpen'>

const AddEntryForm = ({ addNewEntry, closeDialog }: AddEntryFormProps) => {
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        addNewEntry(values)
        actions.resetForm()
      }}
      validate={(values) => {
        const FIELD_REQUIRED = 'Field is required'
        const errors: { [field: string]: string } = {}

        if (!values.description) errors.description = FIELD_REQUIRED
        if (!values.specialist) errors.specialist = FIELD_REQUIRED
        if (!values.date) {
          errors.date = FIELD_REQUIRED
        } else if (!Date.parse(values.date) || !/^\d{2}-\d{2}-\d{4}/g.test(values.date)) {
          errors.date = "Invalid date format (Correct: MM-DD-YYYY)"
        }

        return errors
      }}
    >
      {(formik) => (
        <Form>
          <Field
            label="Description"
            name="description"
            placeholder="Description"
            component={TextField}
          />
          <Field
            label="Specialist"
            name="specialist"
            placeholder="MD House"
            component={TextField}
          />
          <Field
            label="Date"
            name="date"
            placeholder="MM-DD-YYY"
            component={TextField}
          />
          <Field
            label="Type"
            name="type"
            component={TextField}
          />

          <DiagnosisSelection
            diagnoses={diagnoses}
            setFieldValue={() => formik.setFieldValue}
            setFieldTouched={() => formik.setFieldTouched}
          ></DiagnosisSelection>
          <SelectField
            name="healthCheckRating"
            label="Health Check Rating"
            options={HealthCheckRatingOptions}
          />
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Button
                variant="contained"
                sx={{ float: 'left' }}
                onClick={closeDialog}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button disabled={!formik.dirty || !formik.isValid} variant="contained" sx={{ float: 'right' }} type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default AddEntryForm
