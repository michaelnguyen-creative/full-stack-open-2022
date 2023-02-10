import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'

import { Patient } from '../types'
import { useStateValue } from '../state'
import { apiBaseUrl } from '../constants'

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
        dispatch({ type: 'UPDATE_PATIENT', payload: res.data })
        setPatient(res.data)
      })
  }, [])

  if (!patient) return <div>Loading patient info</div>

  return (
    <div>
      <h3>
        {patient.name}{' '}
        {patient.gender === 'male' ? (
          <MaleIcon />
        ) : patient.gender === 'female' ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h3>
      <i>{patient.gender}</i>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  )
}

export default PatientView
