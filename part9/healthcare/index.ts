/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import calculateBmi from "./calculators/bmiCalculator";
import calculateExercises from "./calculators/exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  // console.log('h', typeof height, 'w', weight);
  const heightInCm = Number(height);
  const weightInKg = Number(weight);
  if (!heightInCm || !weightInKg)
    return res.status(400).json({ error: "malformatted parameters" }).end();

  const bmi = calculateBmi(heightInCm, weightInKg);
  return res.json({ weight: weightInKg, height: heightInCm, bmi });
});

app.post("/exercises", (req, res) => {
  if (Object.keys(req.body).length !== 2)
    return res.status(400).send({ error: "missing parameters" });

  const { daily_exercises, target } = req.body;

  if (
    daily_exercises.some((h: unknown) => Number.isNaN(h)) ||
    Number.isNaN(target)
  )
    return res.status(400).send({ error: "malformatted parameters" });

  const stats = calculateExercises(daily_exercises, target);
  res.status(200).json(stats).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
