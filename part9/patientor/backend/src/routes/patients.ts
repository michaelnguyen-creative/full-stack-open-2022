import express from "express";
import patientService from "../services/patientService";
import utils from "../utils"

const router = express.Router();

router.get("/patients", (_req, res) => {
  const patients = patientService.getPatientsWithoutSsn()
  res.status(200).json(patients);
});

router.post("/patients", (req, res) => {
  try {
    const patient = utils.getPatientFromRequest(req.body);
    const addedPatient = patientService.addPatient(patient);
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
