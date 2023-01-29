import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { GET_BOOKS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const books = useQuery(GET_BOOKS)

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
    </div>
  )
}

export default App
