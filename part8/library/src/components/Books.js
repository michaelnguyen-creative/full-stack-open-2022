import { gql, useQuery } from '@apollo/client'

export const GET_BOOKS = gql`
  query getBooks {
    allBooks {
      title
      author
      published
    }
  }
`

const Books = (props) => {
  const books = useQuery(GET_BOOKS)

  if (!books) return 'Loading...'
  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
