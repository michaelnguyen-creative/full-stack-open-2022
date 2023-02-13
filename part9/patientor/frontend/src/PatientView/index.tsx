import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'

import { Entry, HealthCheckEntry, Patient } from '../types'
import { useStateValue } from '../state'
import { apiBaseUrl } from '../constants'
import { updatePatient } from '../state/reducer'

import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import {
  LocalHospitalRounded,
  WorkRounded,
  MedicalInformationRounded,
} from '@mui/icons-material'
import { Card, CardContent, Typography } from '@mui/material'

import AddEntryModal, {
  HealthCheckEntryFormValues,
} from '../AddEntryModal/AddEntryForm'

type EntryProps = {
  entry: Entry
  children: JSX.Element
  type: string
}

const BasicEntryBox = ({ entry, children, type }: EntryProps) => {
  return (
    <Card
      sx={{
        backgroundColor:
          type === 'Hospital'
            ? 'secondary.light'
            : type === 'OccupationalHealthcare'
            ? 'info.light'
            : 'warning.light',
      }}
    >
      <CardContent>
        <Typography>{entry.date}</Typography>
        <Typography>{entry.description}</Typography>
        {children}
        <Typography>diagnosed by {entry.specialist}</Typography>
      </CardContent>
    </Card>
  )
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`)
}

const renderEntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <BasicEntryBox entry={entry} type={entry.type}>
          <LocalHospitalRounded />
        </BasicEntryBox>
      )
    case 'OccupationalHealthcare':
      return (
        <BasicEntryBox entry={entry} type={entry.type}>
          <Typography>
            <WorkRounded /> {entry.employerName}
          </Typography>
        </BasicEntryBox>
      )
    case 'HealthCheck':
      return (
        <BasicEntryBox entry={entry} type={entry.type}>
          <MedicalInformationRounded />
        </BasicEntryBox>
      )
    default:
      return assertNever(entry)
  }
}

const PatientView = () => {
  const [patient, setPatient] = useState<Patient | null>(null)
  const patientId = useMatch('/patient/:patientId')?.params.patientId
  const [{ patients }, dispatch] = useStateValue()


  useEffect(() => {
    if (Object.keys(patients).includes(patientId as string)) {
      setPatient(patients[patientId as string])
      return
    }

    void axios.get(`${apiBaseUrl}/patients/${patientId}`).then((res) => {
      dispatch(updatePatient(res.data))
      setPatient(res.data)
    })
  }, [])

  if (!patient) return <div>Loading patient info</div>
  if (!patientId) throw new Error("Oops, something's wrong with patientId")

  const addNewEntry = async (entryValues: HealthCheckEntryFormValues) => {
    const { data } = await axios.post<HealthCheckEntry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      entryValues
    )
    console.log('added entry', data)
    dispatch({
      type: 'ADD_HEALTHCHECK_ENTRY',
      payload: { patientId, entryValues: data },
    })
    return data
  }

  return (
    <div>
      <h2>
        {patient.name}{' '}
        {patient.gender === 'male' ? (
          <MaleIcon />
        ) : patient.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <div key={e.id}>{renderEntryDetails(e)}</div>
      ))}
      <button onClick={() => ''}>New Entry</button>
      <AddEntryModal addNewEntry={addNewEntry} />
    </div>
  )
}

export default PatientView
