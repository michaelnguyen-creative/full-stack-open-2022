import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'

import { Patient } from '../types'
import { useStateValue } from '../state'
import { apiBaseUrl } from '../constants'
import { updatePatient } from '../state/reducer'

import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'

const PatientView = () => {
  const match = useMatch('/patient/:patientId')
  const [patient, setPatient] = useState<Patient | null>(null)
  const [{ patients }, dispatch] = useStateValue()

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
      <div>
        {patient.entries.map((e) => {
          return (
            <div key={e.id}>
              <div>
                {e.date} {e.description}
              </div>
              <ul>
                {e.diagnosisCodes?.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PatientView
