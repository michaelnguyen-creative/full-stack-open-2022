import { Formik, Form, Field } from 'formik'

import { EntryWithoutId, HealthCheckRating } from '../../types'
import {
  TextField,
  SelectField,
  DiagnosisSelection,
  HealthCheckRatingOption,
  HealthcareTypeRadios
} from '../FormField'

import { useStateValue } from '../../state'
import { AddEntryModalProps } from './index'

import {
  Container,
  Button,
  Grid,
  Divider,
  Box,
  FormLabel,
  Typography,
} from '@mui/material'

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

export type EntryFormValues = {
  description: string
  specialist: string
  date: string
  diagnosisCodes: string[]
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'
  healthCheckRating: HealthCheckRating
  discharge: {
    date: string
    criteria: string
  }
  employerName: string
  sickLeave: {
    startDate: string
    endDate: string
  }
}

type AddEntryFormProps = Omit<AddEntryModalProps, 'dialogIsOpen'>

const EntryFormControl = ({ addNewEntry, closeDialog }: AddEntryFormProps) => {
  const [{ diagnoses }] = useStateValue()

  return (
    <Formik<EntryFormValues>
      initialValues={{
        description: '',
        specialist: '',
        date: '',
        diagnosisCodes: [''],
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating['Healthy'],
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={(values, actions) => {
        const sanitizeData = (): EntryWithoutId => {
          const baseValues = {
            description: values.description,
            specialist: values.specialist,
            date: values.date,
            diagnosisCodes: values.diagnosisCodes,
          }
          switch (values.type) {
            case 'HealthCheck':
              return {
                ...baseValues,
                type: 'HealthCheck',
                healthCheckRating: values.healthCheckRating,
              }
            case 'Hospital':
              return {
                ...baseValues,
                type: 'Hospital',
                discharge: {
                  date: values.discharge.date,
                  criteria: values.discharge.criteria,
                },
              }
            case 'OccupationalHealthcare':
              return {
                ...baseValues,
                type: 'OccupationalHealthcare',
                employerName: values.employerName,
                sickLeave: {
                  startDate: values.sickLeave.startDate,
                  endDate: values.sickLeave.endDate,
                },
              }
          }
        }
        const valuesToAdd = sanitizeData()
        addNewEntry(valuesToAdd)
        actions.resetForm()
        closeDialog()
      }}
      validate={({ description, specialist, date, type, employerName }) => {
        const FIELD_REQUIRED = 'Field is required'
        const errors: { [field: string]: string } = {}

        if (!description) errors.description = FIELD_REQUIRED
        if (!specialist) errors.specialist = FIELD_REQUIRED

        if (!date) {
          errors.date = FIELD_REQUIRED
        } else if (!Date.parse(date) || !/^\d{2}-\d{2}-\d{4}/g.test(date)) {
          errors.date = 'Invalid date format (Correct: MM-DD-YYYY)'
        }

        if (type === 'OccupationalHealthcare') {
          !employerName && (errors.employerName = FIELD_REQUIRED)
        }

        return errors
      }}
    >
      {(formik) => {
        return (
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
            <DiagnosisSelection
              diagnoses={diagnoses}
              setFieldValue={() => formik.setFieldValue}
              setFieldTouched={() => formik.setFieldTouched}
            ></DiagnosisSelection>
            <HealthcareTypeRadios />
            {formik.values.type === 'HealthCheck' ? (
              <SelectField
                name="healthCheckRating"
                label="Rating"
                options={HealthCheckRatingOptions}
              />
            ) : formik.values.type === 'Hospital' ? (
              <>
                <Field
                  name="discharge.date"
                  label="Discharge Date"
                  placeholder="MM-DD-YYYY"
                  row
                  component={TextField}
                ></Field>
                <Field
                  name="discharge.criteria"
                  label="Criteria"
                  row
                  component={TextField}
                ></Field>
              </>
            ) : (
              <>
                <Field
                  name="employerName"
                  label="Employer"
                  component={TextField}
                ></Field>
                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    rowSpacing={1}
                    spacing={2}
                  >
                    <Grid item xs={3}>
                      <FormLabel>Sick Leave</FormLabel>
                    </Grid>
                    <Grid item xs={9}><Divider /></Grid>
                    <Grid item xs={6}>
                      <Field
                        name="sickLeave.startDate"
                        label="Start Date"
                        component={TextField}
                      ></Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="sickLeave.endDate"
                        label="End Date"
                        component={TextField}
                      ></Field>
                    </Grid>
                  </Grid>
              </>
            )}
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
                <Button
                  disabled={!formik.dirty || !formik.isValid}
                  variant="contained"
                  sx={{ float: 'right' }}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default EntryFormControl
