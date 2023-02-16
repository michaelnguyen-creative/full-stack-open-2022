import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import axios from 'axios'

import { Patient, Entry, EntryWithoutId } from '../../types'
import { useStateValue } from '../../state'
import { apiBaseUrl } from '../../constants'
import { updatePatient } from '../../state/reducer'

import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import { Button } from '@mui/material'

import AddEntryModal from '../../Modals/AddEntry/index'
import { EntryFormValues } from '../../Modals/AddEntry/EntryForm'

import entryDetails from './EntryDetails'

const PatientView = () => {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const patientId = useMatch('/patient/:patientId')?.params.patientId
  const [{ patients }, dispatch] = useStateValue()

  useEffect(() => {
    if (Object.keys(patients).includes(patientId as string)) {
      setPatient(patients[patientId as string])
      return
    }

    void axios
      .get<Patient>(`${apiBaseUrl}/patients/${patientId}`)
      .then((res) => {
        dispatch(updatePatient(res.data))
        setPatient(res.data)
      })
  }, [])

  if (!patient) return <div>Loading patient info</div>
  if (!patientId) throw new Error("Oops, something's wrong with patientId")

  const addNewEntry = async (entryValues: EntryWithoutId) => {
    try {
      const { data: addedEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        entryValues
      )
      dispatch({
        type: 'ADD_ENTRY',
        payload: { patientId, entry: addedEntry },
      })
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log('err', err?.response?.data.error)
        setError(err?.response?.data.error || 'Unrecognized axios error')
      } else {
        console.log('Unknown error', err)
        setError('Unknown error')
      }
    }
  }

  const handleOpenDialog = (): void => {
    setDialogIsOpen(true)
  }

  const handleCloseDialog = (): void => {
    setDialogIsOpen(false)
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
        <div key={e.id}>{entryDetails.renderEntryDetails(e)}</div>
      ))}
      <AddEntryModal
        addNewEntry={addNewEntry}
        dialogIsOpen={dialogIsOpen}
        closeDialog={handleCloseDialog}
        error={error}
      />
      <Button variant="outlined" onClick={handleOpenDialog}>
        New Entry
      </Button>
    </div>
  )
}

export default PatientView
