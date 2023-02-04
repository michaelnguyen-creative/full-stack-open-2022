import { parseArguments } from "./helper"

interface ExerciseStats {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ratings {
  rating: 1 | 2 | 3
  ratingDescription: string
}

const ratePerformance = (average: number, target: number): ratings => {
  const ratio = average / target
  if (ratio < 0.49)
    return {
      rating: 1,
      ratingDescription: 'You have not reached your goal, try again',
    }
  if (ratio < 0.79)
    return {
      rating: 2,
      ratingDescription: 'Good, keep going!',
    }

  return {
    rating: 3,
    ratingDescription: 'Woohoo. You have made it!',
  }
}

const calculateExercises = (
  args: Array<string>
): ExerciseStats => {
  const { values } = parseArguments(args)
  const dailyTarget: number = values[0]
  const dailyExerciseHours: Array<number> = values.slice(1)  
  // Validate data input
  if (!dailyTarget || dailyExerciseHours.length == 0) throw new Error('invalid daily target or daily exercise hours')

  const periodLength = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length
  const average = dailyExerciseHours.reduce((acc, hour) => acc + hour, 0) / periodLength
  const success = average >= dailyTarget
  const { rating, ratingDescription } = ratePerformance(average, dailyTarget)
  // Metrics:
  // successful if average >= target
  // rating = average / target (0-.49 1, .5-.79 2, .8-1 3)
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: dailyTarget,
    average,
  }
}

// console.log(process.argv);

console.log(calculateExercises(process.argv))
