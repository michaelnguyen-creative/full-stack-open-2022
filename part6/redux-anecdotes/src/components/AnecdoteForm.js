import { useDispatch } from "react-redux"
import { addNew } from '../reducers/anecdoteReducer'
import { addMessage, removeMessage } from '../reducers/notifReducer'
import anecdotesService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    anecdotesService.createNew(content).then((returnedAnecdote) => {
      dispatch(addNew(returnedAnecdote))
    })

    dispatch(addMessage(`created '${content}'`))
    setTimeout(() => dispatch(removeMessage()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm