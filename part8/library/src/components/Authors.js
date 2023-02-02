import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
import { GET_AUTHORS, SET_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const { loading, data } = useQuery(GET_AUTHORS, {
    variables: {
      pollInterval: 500,
    },
    onCompleted: (data) => console.log('data from Authors/GET_AUTHORS', data),
    onError: (err) => console.log('error from Authors/GET_AUTHORS', err),
  })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  })

  if (loading) return 'Loading...'

  if (!props.show) {
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    editAuthor({
      variables: {
        name,
        born: Number(born),
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
        <Select
          options={generateOptions()}
          onChange={(e) => {
            setName(e.value)
          }}
        />
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
