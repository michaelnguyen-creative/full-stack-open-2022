import { useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { GET_BOOKS_BY_GENRE } from '../queries'

const Books = ({ show, books }) => {
  const [booksToShow, setBooksToShow] = useState(books)
  const [getBooksByGenre, booksByGenre] = useLazyQuery(GET_BOOKS_BY_GENRE)

  useEffect(() => {
    if (booksByGenre.data) {
      setBooksToShow(booksByGenre.data.allBooks)
    }
  }, [booksByGenre.data])

  if (books.loading) return 'Loading...'

  if (!show) {
    return null
  }

  const getUniqueGenres = () => {
    const allGenres = books.map(({ genres }) => genres).flat()
    return allGenres.reduce(
      (prev, curr) => (!prev.includes(curr) ? prev.concat(curr) : prev),
      []
    )
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {getUniqueGenres().map((g) => (
          <button
            key={g}
            onClick={(e) => getBooksByGenre({ variables: { genre: g } })}
          >
            {g}
          </button>
        ))}
        <button onClick={() => setBooksToShow(books)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
