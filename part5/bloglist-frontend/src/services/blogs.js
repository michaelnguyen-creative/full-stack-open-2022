import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// const getUserBlogs = async () => {
//   const axiosRes = await axios.get(baseUrl)
// }

const blogService = { getAll }
export default blogService 