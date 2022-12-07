import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userObj) => {
  // async w/ await => always returns settled promise(s)
  // settled means either fulfilled or rejected (pending is not settled)
    // three states of a promise: 
      // fulfileed & rejected aka. settled
      // pending
  const axiosRes = await axios.post(
    baseUrl,
    userObj,
  )
  return axiosRes.data
}

/* Mock data for testing login

{
  "username": "robert-c",
  "password": "3m3r0n"
}

*/

const loginService = { login }
export default loginService