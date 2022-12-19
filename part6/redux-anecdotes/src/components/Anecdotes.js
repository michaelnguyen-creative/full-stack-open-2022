import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(incrementVote(id))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} vote={handleVote(anecdote.id)} />
        </div>
      ))}
    </>
  )
}

export default Anecdotes
