import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'

import { Entry, Patient } from '../types'
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
  const match = useMatch('/patient/:patientId')
  const [{ patients, diagnoses }, dispatch] = useStateValue()

  useEffect(() => {
    if (Object.keys(patients).includes(match?.params.patientId as string)) {
      setPatient(patients[match?.params.patientId as string])
      return
    }

    void axios
      .get(`${apiBaseUrl}/patients/${match?.params.patientId}`)
      .then((res) => {
        dispatch(updatePatient(res.data))
        setPatient(res.data)
      })
  }, [])

  if (!patient) return <div>Loading patient info</div>

  const findDiagnosis = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code)
    if (!diagnosis) return 'No diagnosis info found'
    return diagnosis.name
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
      {/* <div>
        {patient.entries.map((e) => {
          return (
            <div key={e.id}>
              <div>
                {e.date} {e.description}
              </div>
              <ul>
                {e.diagnosisCodes?.map((c) => (
                  <li key={c}>
                    {c} {findDiagnosis(c)}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

export default PatientView
