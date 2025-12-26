import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
////This is pre-Thunk code : 

  // useEffect(() => {
  //   fetch('http://localhost:3001/anecdotes')
  //     .then(res => res.json())
  //     .then(data => {
  //       dispatch(setAnecdotes(data))
  //     })
  // }, [dispatch])

useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App
