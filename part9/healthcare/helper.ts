interface ArgValues {
  valueOne?: number
  valueTwo?: number
  values?: Array<number>
}

export const parseArguments = (args: string[]): ArgValues => {
  const valueOne = Number(process.argv[2])
  const valueTwo = Number(process.argv[3])

  if (process.argv.length < 3) throw new Error('Missing arguments')
  // bmi case
  if (valueOne + valueTwo > 20 && process.argv.length === 4)
    return {
      valueOne,
      valueTwo,
    }
  // exercise case
  return { values: process.argv.slice(2).map((arg) => Number(arg)) }
}
