import express from "express";
import patients from "../../data/patients";
import { Patient } from "../types";

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

export default router;
