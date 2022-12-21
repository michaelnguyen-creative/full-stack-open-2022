import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from './components/AnecdoteForm'
import Notification from "./components/Notification"
import Filter from './components/Filter'
import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  // Fetching data from server should be implemented here
  useEffect(() => {
    // as a React effect hook
    anecdotesService.getAll().then(anecdotes => {
      console.log('anecdotes', anecdotes)
      dispatch(setAnecdotes(anecdotes))
    })

  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App