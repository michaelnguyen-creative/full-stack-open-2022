import { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { GET_BOOKS, SUBSCRIBE_BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (data) => {
    let seen = new Set()
    return data.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook))
    }
  })
}
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const books = useQuery(GET_BOOKS, {
    onError: (err) => console.log('error from App/GET_BOOKS', err)
  })
  const client = useApolloClient()

  useSubscription(SUBSCRIBE_BOOK_ADDED, {
    onData: ({ data }) => {
      console.log('data', data)
      const addedBook = data.data.bookAdded
      window.alert(`added ${addedBook.title}`)
      updateCache(client.cache, { query: GET_BOOKS }, addedBook)
    }
  })

  if (books.loading) return 'Books are loading...'


  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button
          style={{ display: !token ? '' : 'none' }}
          onClick={() => setPage('login')}
        >
          login
        </button>
        <button style={{ display: token ? '' : 'none' }} onClick={() => setPage('recommend')}>recommend</button>
        <button
          style={{ display: token ? '' : 'none' }}
          onClick={() => setPage('add')}
        >
          add book
        </button>
        <button style={{ display: token ? '' : 'none' }} onClick={logout}>
          logout
        </button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} books={books.data.allBooks} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
      <NewBook show={page === 'add'} />
      <Recommendation show={page === 'recommend'} books={books.data.allBooks} />
    </div>
  )
}

export default App
