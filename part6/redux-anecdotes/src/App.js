import { useDispatch } from 'react-redux'
import Anecdotes from "./components/Anecdotes"
import { addNew } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addNew(content))
  }

  return (
    <div>
      <Anecdotes />
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App