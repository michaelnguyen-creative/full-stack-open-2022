import express from 'express';
import calculateBmi from './calculators/bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  // console.log('h', typeof height, 'w', weight);
  const heightInCm = Number(height);
  const weightInKg = Number(weight);
  if (!heightInCm || !weightInKg) return res.status(400).json({ error: 'malformatted parameters' }).end();

  const bmi = calculateBmi(heightInCm, weightInKg);
  return res.json({ weight: weightInKg, height: heightInCm, bmi });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
