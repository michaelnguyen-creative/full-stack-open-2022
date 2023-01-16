import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'

const GET_AUTHORS_DETAILS = gql`
  query getAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const SET_BIRTHYEAR = gql`
  mutation setBirthYear($name: String!, $born: String!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const { data } = useQuery(GET_AUTHORS_DETAILS, {
    variables: {
      pollInterval: 500,
    },
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: GET_AUTHORS_DETAILS }],
  })

  if (!props.show) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editAuthor({
      variables: {
        name,
        born
      },
    })
    setName('')
    setBorn('')
  }

  const generateOptions = () => {
    return data.allAuthors.reduce(
      (acc, { name }) => acc.concat({ value: name, label: name }),
      []
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data &&
            data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <Select options={generateOptions()} onChange={(e) => setName(e.value)} />
        <div>
          born
          <input value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
