interface ArgValues {
  values: Array<number>
}

export const parseArguments = (_args: Array<string>): ArgValues => {
  const valueOne = Number(_args[2])
  const valueTwo = Number(_args[3])

  if (_args.length < 3) throw new Error('Missing arguments')
  // bmi case
  if (valueOne + valueTwo > 20 && _args.length === 4)
    return {
      values: [valueOne, valueTwo],
    }
  // exercise case
  return { values: _args.slice(2).map((arg) => Number(arg)) }
}
