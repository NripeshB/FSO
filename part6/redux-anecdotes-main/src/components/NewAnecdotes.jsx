import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

let timeoutId  

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const anecdote = event.target.add_Anecdote.value
    event.target.add_Anecdote.value = ''

    const newAnecdote = {
      content: anecdote,
      votes: 0
    }

    const response = await fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAnecdote)
    })

    const savedAnecdote = await response.json()

    dispatch(createAnecdote(savedAnecdote))

    dispatch(setNotification(`you added '${anecdote}'`))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="add_Anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote
