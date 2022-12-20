import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { addMessage, removeMessage } from '../reducers/notifReducer'

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

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const dispatch = useDispatch()

  const anecdotesByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  
  return (
    <>
      {anecdotesByVotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => {
            dispatch(incrementVote(anecdote.id))
            dispatch(addMessage(`you voted for '${anecdote.content.slice(0, 20)}...'`))
            setTimeout(() => dispatch(removeMessage()), 5000)
          }}
        />
      ))}
    </>
  )
}

export default AnecdoteList
