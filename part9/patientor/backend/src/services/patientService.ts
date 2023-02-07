import { v1 as uuidv1 } from "uuid";

import patients from "../../data/patients"
import { Patient, PatientFromRequest } from "../types";

const getPatientsWithoutSsn = (): Omit<Patient, "ssn">[] => patients.map(
  ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })
);

const addPatient = (param: PatientFromRequest): Patient => {
  const patientToAdd = {
    id: uuidv1(),
    ...param
  };
  patients.push(patientToAdd);
  return patientToAdd;
};

export default {
  getPatientsWithoutSsn,
  addPatient,
}