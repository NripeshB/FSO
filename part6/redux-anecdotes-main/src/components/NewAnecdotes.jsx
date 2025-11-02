import {  useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'



  const NewAnecdote = ()=> {
    const dispatch = useDispatch()
    const addAnecdote = event =>{
    
    event.preventDefault()
    const Anecdote = event.target.add_Anecdote.value
    event.target.add_Anecdote.value = ''
    dispatch(createAnecdote(Anecdote))
  }
    return(
        <div>
            <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='add_Anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>

        </div>
    )
  }
  export default NewAnecdote