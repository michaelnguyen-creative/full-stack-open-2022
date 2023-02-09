import express from "express";
import patientService from "../services/patientService";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getPublicPatients();
  res.status(200).json(patients);
});

router.post("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  const patientId = req.params.id;
  const patientInfo = patientService.getPatientById(patientId);
  if (!patientInfo) res.status(400).send({ error: "Malformatted id" });
  res.status(200).json(patientInfo);
});

export default router;
