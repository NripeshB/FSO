// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import AnecdoteList from './components/AnecdoteList'
// import NewAnecdote from './components/NewAnecdotes'
// import Notification from './components/Notification'
// import Filter from './components/Filter'
// import { initializeAnecdotes } from './reducers/anecdoteReducer'
// const App = () => {
//   const dispatch = useDispatch()
// ////This is pre-Thunk code : 

//   // useEffect(() => {
//   //   fetch('http://localhost:3001/anecdotes')
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       dispatch(setAnecdotes(data))
//   //     })
//   // }, [dispatch])

// useEffect(() => {
//     dispatch(initializeAnecdotes())
//   }, [dispatch])

//   return (
//     <div>
//       <Notification />
//       <Filter />
//       <AnecdoteList />
//       <NewAnecdote />
//     </div>
//   )
// }

// export default App



import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './request'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false  
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return (
      <div>
        <h2>Anecdote service not available</h2>
        <p>Problems in server</p>
      </div>
    )
  }

  // ✅ 3️⃣ Success state
  const anecdotes = result.data

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={anecdotes} />
      <NewAnecdote />
    </div>
  )
}

export default App
