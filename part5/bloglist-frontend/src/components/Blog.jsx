import {useState} from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [InfoVisible, setInfoVisible] = useState(false)
        
  
      const hideWhenVisible = {display: InfoVisible? 'none':''}
      const showWhenVisible = {display: InfoVisible? '':'none'}

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
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
        </div>
        <div>
          Posted by {blog.user.username}
        </div>
      </div>
  </div>
)}
export default Blog