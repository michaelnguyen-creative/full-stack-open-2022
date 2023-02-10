import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Button, Divider, Container } from '@material-ui/core'

import { apiBaseUrl } from './constants'
import { useStateValue } from './state'
import { Patient } from './types'

import PatientListPage from './PatientListPage'
import { Typography } from '@material-ui/core'

import PatientView from './components/PatientView'

const App = () => {
  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        )
        dispatch({ type: 'SET_PATIENT_LIST', payload: patientListFromApi })
      } catch (e) {
        console.error(e)
      }
    }
    void fetchPatientList()
  }, [dispatch])

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage />} />
          <Route path="/patient/:patientId" element={<PatientView />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
