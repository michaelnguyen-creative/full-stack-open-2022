// import { useSelector, useDispatch } from 'react-redux'
import Anecdotes from "./components/Anecdotes"

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  // // Action: INCREMENT_VOTE
  // const vote = (id) => {
  //   dispatch({
  //     type: 'INCREMENT_VOTE',
  //     data: {
  //       id
  //     }
  //   })
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    ({
      type: 'ADD_NEW',
      data: {
        content
      }
    })
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