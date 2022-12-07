import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  console.log('set token', token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('config', config)
  const axiosRes = await axios.post(baseUrl, newBlog, config)
  return axiosRes.data
}

const update = async (objToUpdate) => {
  const axiosRes = await axios.put(`${baseUrl}/${objToUpdate.id}`, objToUpdate)
  console.log('updated blog', axiosRes)
  return axiosRes
}

const blogService = { getAll, create, update, setToken }
export default blogService 