import axios from 'axios'

const baseUrl = '/api/blogs'

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

export default { update }
