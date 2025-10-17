import { useState } from 'react'
import likeService from './Likes'   
import deleteService from './DeleteBlog'   

const Blog = ({ blog, setBlogs, blogs }) => { 
  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const handleDelete = async () => {
  try {
    const confirmed = window.confirm(`Delete ${blog.title} by ${blog.author}?`)
    if (!confirmed) return

    const status = await deleteService.deleteBlog(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
    return status
  } catch (error) {
    console.error('Error deleting blog:', error)
  }
}

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const returnedBlog = await likeService.update(blog.id, updatedBlog)

      setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {blog.title} {blog.author}
        </div>
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setInfoVisible(true)}>View</button>
          </div>
          <div style={showWhenVisible}>
            <button onClick={() => setInfoVisible(false)}>Hide</button>
          </div>
        </div>
      </div>

      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          likes {blog.likes} <button onClick={handleLike}>Like</button>
        </div>
        <div>Posted by {blog.user.username}</div>
        <button onClick={()=>handleDelete()}>Delete</button>
      </div>
    </div>
  )
}

export default Blog
