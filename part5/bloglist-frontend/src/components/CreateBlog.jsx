import { useState } from 'react'


const CreateBlog = ({ url, handleCreateBlog, author, title, setTitle, setUrl, setAuthor }) => {
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible? 'none':'' }
  const showWhenVisible = { display: loginVisible? '':'none' }
  return(
    <>
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Create new Blog </button>
        </div>
        <div style={showWhenVisible}>
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
          <div>
            <button onClick={() => setLoginVisible(false)}>Close</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateBlog