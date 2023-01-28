import { useQuery } from '@apollo/client'
import { GET_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(GET_BOOKS)

  console.log('b', books.data.allBooks)
  if (books.loading) return 'Loading...'
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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
