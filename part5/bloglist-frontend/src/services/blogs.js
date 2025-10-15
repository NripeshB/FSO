import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken=>{
  token = `Bearer ${newToken}`
}
const config ={ headers: {Authorization: token}}


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = ()=>{
  const response = axios.post(baseUrl, config)
  return response.data
}

export default { getAll, setToken, getUser  }