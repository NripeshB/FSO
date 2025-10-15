import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(()=>{
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJson){
      const user = JSON.parse(loggedInUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
    
    
  }, [])

   const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser',JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
    }
  }
const logUserOut = ()=>{
  blogService.setToken(null) 
  setUser(null)
  window.localStorage.removeItem('loggedInUser')
}

const handleCreateBlog = async (event) => {
  event.preventDefault()

  const newBlog = {
    title,
    author,
    url,
  }

  try {
    const createdBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(createdBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  } catch (error) {
    console.log('Error creating blog:', error)
  }
}


  const LoginForm = () => (
    <>
    <h1>log in to application</h1>
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )

  const LoggedPage = ()=>{
    return(
      <>
       <div>
       <h1>blogs</h1>
        <p>{user.name} logged in</p>
      
      </div>

      <div>
        <h1>Create New Blog</h1>
        <form onSubmit={handleCreateBlog}>
          <div>
            <label>
              title
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url
              <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>

      <div>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <button onClick={logUserOut}>logout</button>
      </div>
      </>
    )
  }

  return (
    <div>
      {!user && LoginForm()}
    {user && (
      LoggedPage()
    )}
    </div>
  )
}

export default App