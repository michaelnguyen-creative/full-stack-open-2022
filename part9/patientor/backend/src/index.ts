import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients"

const app = express();
const PORT = 4000;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json())

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use('/api', diagnosesRouter)
app.use('/api/patients', patientsRouter)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
