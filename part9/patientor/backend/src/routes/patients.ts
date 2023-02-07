import express from "express";
import { v1 as uuidv1 } from "uuid";
import patients from "../../data/patients";
import { Patient, PatientFromRequest } from "../types";

const router = express.Router();

const patientsWithoutSSN: Omit<Patient, "ssn">[] = patients.map(
  ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })
);

router.get("/patients", (_req, res) => {
  res.status(200).json(patientsWithoutSSN);
});

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name))
    throw new Error(`Missing or incorrect name: ${name}`);
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error(`Missing or incorrect date: ${date}`);
  return date;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender))
    throw new Error(`Missing or incorrect gender: ${gender}`);
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation))
    throw new Error(`Missing or incorrect occupation: ${occupation}`);
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error("Missing or incorrect ssn");
  return ssn;
};

const addPatient = (params: PatientFromRequest): Patient => {
  const patientToAdd = {
    id: uuidv1(),
    ...params
  };
  patients.push(patientToAdd);
  console.log('ps', patients)
  return patientToAdd;
};

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  gender: unknown,
  occupation: unknown,
  ssn: unknown
}
const getPatientFromRequest = ({ name, dateOfBirth, gender, occupation, ssn}: Fields): PatientFromRequest => {
  const patient: PatientFromRequest = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
  };
  return patient;
};

router.post("/patients", (req, res) => {
  try {
    const patient = getPatientFromRequest(req.body);
    const addedPatient = addPatient(patient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Oops! Something went wrong. ";
    if (error instanceof Error) {
      errorMessage += errorMessage.concat(`Error: ${error.message}`);
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
