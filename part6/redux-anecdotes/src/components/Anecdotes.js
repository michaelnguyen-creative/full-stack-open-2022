import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const anecdotesByVotes = anecdotes.sort((a, b) => b.votes - a.votes)
  
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotesByVotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(incrementVote(anecdote.id))}
        />
      ))}
    </>
  )
}

export default Anecdotes
