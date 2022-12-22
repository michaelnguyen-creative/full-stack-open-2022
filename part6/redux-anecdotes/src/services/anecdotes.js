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

const anecdotesService = { getAll, createNew }
export default anecdotesService