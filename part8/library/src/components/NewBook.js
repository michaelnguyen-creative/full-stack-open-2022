import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_BOOKS, CREATE_NEW_BOOK } from '../queries'
import { updateCache } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createNewBook] = useMutation(CREATE_NEW_BOOK, {
    onError: (err) => {
      console.log('error from NewBook/CREATE_NEW_BOOK', err)
    },
    update: (cache, res) => {
      const addedBook = res.data.addBook
      updateCache(cache, { query: GET_BOOKS }, addedBook)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    createNewBook({
      variables: {
        title,
        published: Number(published),
        author,
        genres,
      },
    })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
