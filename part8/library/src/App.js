import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <div style={{ display: !token ? '' : 'none' }}>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <div style={{ display: token ? '' : 'none' }}>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>logout</button>
        </div>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
