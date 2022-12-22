import axios from 'axios'
const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const res = await axios.post(baseUrl, { content, votes: 0 })
  return res.data
}

const updateVote = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, {
    content: anecdote.content,
    votes: anecdote.votes + 1,
  })
  return res.data
}

const anecdotesService = { getAll, createNew, updateVote }
export default anecdotesService
