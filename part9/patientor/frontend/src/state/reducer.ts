import { State } from './state'
import { Diagnosis, HealthCheckEntry, Patient } from '../types'

export type Action =
  | {
      type: 'SET_PATIENT_LIST'
      payload: Patient[]
    }
  | {
      type: 'ADD_PATIENT'
      payload: Patient
    }
  | {
      type: 'UPDATE_PATIENT'
      payload: Patient
    }
  | {
      type: 'SET_DIAGNOSES'
      payload: Diagnosis[]
    }
  | {
      type: 'ADD_HEALTHCHECK_ENTRY'
      payload: {
        patientId: string
        entryValues: HealthCheckEntry
      }
    }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      }
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      }
    case 'UPDATE_PATIENT':
      const updatePatient = () => {
        const newStatePatients = {
          ...state.patients,
        }
        newStatePatients[action.payload.id] = action.payload
        return newStatePatients
      }
      return {
        ...state,
        patients: updatePatient(),
      }
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: action.payload,
      }
    case "ADD_HEALTHCHECK_ENTRY":
      const addHealthCheckEntry = () => {
        const newStatePatients = {
          ...state.patients
        }
        const patient = newStatePatients[action.payload.patientId]
        patient.entries.push(action.payload.entryValues)
        return newStatePatients
      }
      return {
        ...state,
        patients: addHealthCheckEntry()
      }
    default:
      return state
  }
}

export const initializePatients = (data: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: data,
  }
}

export const addPatient = (data: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: data,
  }
}

export const updatePatient = (data: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: data,
  }
}
