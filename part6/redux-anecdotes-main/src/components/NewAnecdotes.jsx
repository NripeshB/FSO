import {  useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

let timeoutId  

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()

    const anecdote = event.target.add_Anecdote.value
    event.target.add_Anecdote.value = ''

    
    dispatch(createAnecdote(anecdote))

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
