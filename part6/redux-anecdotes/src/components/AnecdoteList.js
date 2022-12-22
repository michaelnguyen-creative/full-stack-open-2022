import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
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
  const keyword = useSelector(({ keyword }) => keyword)
  const dispatch = useDispatch()

  const anecdotesByVotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = anecdotesByVotes.filter((anecdote) => anecdote.content.includes(keyword))

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => {
            dispatch(vote(anecdote))
            dispatch(addMessage(`you voted for '${anecdote.content.slice(0, 20)}...'`))
            setTimeout(() => dispatch(removeMessage()), 5000)
          }}
        />
      ))}
    </>
  )
}

export default AnecdoteList
