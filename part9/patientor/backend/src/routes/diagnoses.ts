import express from "express";
import diagnoses from "../../data/diagnoses";

const router = express.Router();

router.get("/diagnoses", (_req, res) => {
  res.status(200).json(diagnoses);
});

export default router;
