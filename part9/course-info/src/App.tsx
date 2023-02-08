interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartDescription {
  type: 'normal'
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}

interface CourseSpecialPart extends CoursePartDescription {
  type: 'special'
  requirements: Array<string>
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is the easy course part',
    type: 'normal',
  },
  {
    name: 'Advanced',
    exerciseCount: 7,
    description: 'This is the hard course part',
    type: 'normal',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    type: 'groupProject',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    type: 'submission',
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    type: 'special',
  },
]

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

courseParts.forEach((p) => {
  switch (p.type) {
    case 'normal':
      break
    case 'groupProject':
      break
    case 'submission':
      break
    case 'special':
      break
    default:
      assertNever(p)
  }
})

interface PartProps {
  part: CoursePart
  key?: string
}

const Part = ({ part }: PartProps): JSX.Element => {
  const { name, exerciseCount, ...attr } = part
  return (
    <div>
      <h3>
        {name} {exerciseCount}
      </h3>
      {attr.type === 'normal' ? (
        <p>{attr.description}</p>
      ) : attr.type === 'groupProject' ? (
        <p>project exercises {attr.groupProjectCount}</p>
      ) : attr.type === 'submission' ? (
        <>
          <p>{attr.description}</p>
          <p>submit to {attr.exerciseSubmissionLink}</p>
        </>
      ) : attr.type === 'special' ? (
        <>
          <p>{attr.description}</p>
          <p>required skills: {attr.requirements.join(', ')}</p>
        </>
      )
        : (
        ''
      )}
    </div>
  )
}

type HeaderProps = {
  courseName: string
}

const Header = ({ courseName }: HeaderProps) => <h1>{courseName}</h1>

type CoursePartsProps = {
  courseParts: Array<CoursePart>
}

const Content = ({ courseParts }: CoursePartsProps) => {
  return (
    <div>
      {courseParts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  )
}

const Total = ({ courseParts }: CoursePartsProps): JSX.Element => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((acc, { exerciseCount }) => acc + exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = 'Half Stack app dev'

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
