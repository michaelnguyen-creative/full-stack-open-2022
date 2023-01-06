import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userObj) => {
  const axiosRes = await axios.post(
    baseUrl,
    userObj,
  )
  return axiosRes.data
}

const loginService = { login }
export default loginService