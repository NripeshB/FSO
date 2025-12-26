import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationTimed } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.add_Anecdote.value
    event.target.add_Anecdote.value = ''

    dispatch(appendAnecdote(content))
    dispatch(setNotificationTimed(`you added '${content}'`, 5))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="add_Anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default NewAnecdote
