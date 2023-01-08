import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const axiosRes = await axios.get(baseUrl)
  return axiosRes.data
}

const create = async (blogObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const axiosRes = await axios.post(baseUrl, blogObj, config)
  return axiosRes.data
}

const update = async (blogObj) => {
  const axiosRes = await axios.put(`${baseUrl}/${blogObj.id}`, blogObj)
  return axiosRes
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

const createComment = async (comment, blogId) => {
  const axiosRes = await axios.post(`${baseUrl}/${blogId}/comments`, { data: comment })
  return axiosRes.data
}

const blogService = { getAll, create, update, remove, setToken, createComment }
export default blogService