import {  useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

let timeoutId  // persists between renders

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()

    const anecdote = event.target.add_Anecdote.value
    event.target.add_Anecdote.value = ''

    // 1️⃣ create anecdote
    dispatch(createAnecdote(anecdote))

    // 2️⃣ show notification
    dispatch(setNotification(`you added '${anecdote}'`))

    // 3️⃣ clear previous timer (VERY IMPORTANT)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // 4️⃣ hide notification after 5 seconds
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
