import axios from 'axios'
const baseUrl = '/api/blogs'

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { deleteBlog }