import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  console.log('Token set in blogService:', token ? 'YES' : 'NO') // Debug
}

// Helper function to get current token (with fallback)
const getCurrentToken = () => {
  if (token) return token

  // Fallback: get from localStorage directly
  const loggedUserJSON = window.localStorage.getItem('loggedInUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    return `Bearer ${user.token}`
  }
  return null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const currentToken = getCurrentToken()
  console.log('Current token for create:', currentToken) // Debug

  if (!currentToken) {
    throw new Error('No authentication token available')
  }

  const config = {
    headers: { Authorization: currentToken },
  }

  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.error('Create blog error:', error.response?.data || error.message)
    throw error
  }
}

const update = async (id, newObject) => {
  const currentToken = getCurrentToken()
  const config = currentToken ? { headers: { Authorization: currentToken } } : {}

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const currentToken = getCurrentToken()
  const config = currentToken ? { headers: { Authorization: currentToken } } : {}

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken
}