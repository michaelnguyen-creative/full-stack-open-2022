interface Part {
  name: string
  exerciseCount: number
}

interface Course {
  courseName?: string
  courseParts: Array<Part>
}

const Header = ({ name }: { name: string }) => <h1>{name}</h1>

const Content = ({ courseParts }: Course) => {
  return (
    <>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </>
  )
}

const Total = ({ courseParts }: Course): JSX.Element => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((acc, { exerciseCount }) => acc + exerciseCount, 0)}
    </p>
  )
}
const App = () => {
  const courseName = 'Half Stack app dev'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
