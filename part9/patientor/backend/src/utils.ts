import { PatientFromRequest, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

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

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender))
    throw new Error(`Missing or incorrect gender: ${gender}`);
  return gender === "male" ? Gender.Male : gender === "female" ? Gender.Female : Gender.Other;
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

export default {
  getPatientFromRequest
}