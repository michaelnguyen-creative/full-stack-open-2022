import { v1 as uuidv1 } from "uuid";

import patients from "../../data/patients"
import { Entry, EntryWithoutId, Patient, PatientFromRequest, PublicPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients
}

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id)
}

const addPatient = (param: PatientFromRequest): Patient => {
  const patientToAdd = {
    id: uuidv1(),
    ...param
  };
  patients.push(patientToAdd);
  return patientToAdd;
};

const getPublicPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }))
}

const getPublicPatientById = (id: string): PublicPatient | undefined => {
  const publicPatients = getPublicPatients()
  return publicPatients.find((p) => p.id === id)
}

const addPatientEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const entryToAdd = {
    id: uuidv1(),
    ...entry
  }
  const patient = patients.find((p) => p.id === patientId)
  patient?.entries.push(entryToAdd)
  return entryToAdd
}

export default {
  getPatients,
  getPatientById,
  getPublicPatients,
  getPublicPatientById,
  addPatient,
  addPatientEntry,
}