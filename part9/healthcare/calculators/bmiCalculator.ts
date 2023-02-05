// import { parseArguments } from './helper'

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  // Validate Data
  // Now assume that data is valid (cleaned/processed/sanitized)
  if (!heightInCm || !weightInKg) throw new Error("Invalid height or weight");
  // Fit Data > formula > Result
  const bmi = weightInKg / Math.pow(heightInCm / 100, 2);
  // Evalute Result > returns Category (cat, weight)
  // valid bmi score: (~16, ~40)
  // too much deviation > something's wrong with calculation
  if (bmi < 16.0) return `Underweight (severe thinness)`;
  if (16.0 <= bmi && bmi <= 16.9) return `Underweight (moderate thinness)`;
  if (17.0 <= bmi && bmi <= 18.4) return `Underweight (mild thinness)`;
  if (18.5 <= bmi && bmi <= 24.9) return `Normal (healthy weight)`;
  if (25.0 <= bmi && bmi <= 29.9) return `Overweight (pre-obese)`;
  if (30.0 <= bmi && bmi <= 34.9) return `Obese (class I)`;
  if (35.0 <= bmi && bmi <= 39.9) return `Obese (class II)`;
  if (40.0 <= bmi) return `Obese (class III)`;

  return `Oops, something's wrong. BMI score calculated was: ${bmi}`;
};

// try {
  // console.log(calculateBmi(1638, 59))
  // console.log(process.argv);
  // const { values } = parseArguments(process.argv)
  // console.log(calculateBmi(values[0], values[1]))
// } catch (error) {
//   console.log("error/bmi", error);
// }

export default calculateBmi;
