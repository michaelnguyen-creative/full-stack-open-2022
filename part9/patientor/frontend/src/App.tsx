import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Button, Divider, Container } from '@material-ui/core'

import { apiBaseUrl } from './constants'
import { useStateValue } from './state'
import { Diagnosis, Patient } from './types'

import PatientListPage from './Views/PatientListPage'
import { Typography } from '@material-ui/core'

import SinglePatientPage from './Views/SinglePatientPage/index'
import { initializePatients } from './state/reducer'

const App = () => {
  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
      .then(({ data }) => dispatch({ type: "SET_DIAGNOSES", payload: data }))
      .catch((e) => console.error(e))
    
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        )
        dispatch(initializePatients(patientListFromApi))
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
          <Route path="/patient/:patientId" element={<SinglePatientPage />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
