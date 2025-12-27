// import { useSelector, useDispatch } from 'react-redux'
// import { updateVote } from '../reducers/anecdoteReducer'
// import { setNotificationTimed } from '../reducers/notificationReducer'
// const AnecdoteList = () => {
//   const dispatch = useDispatch()

//   const anecdotes = useSelector(state => state.anecdotes)
//   const filter = useSelector(state => state.filter)

//   const visible = [...anecdotes]
//     .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
//     .sort((a, b) => b.votes - a.votes)

// const vote = (anecdote) => {
//   dispatch(updateVote(anecdote))
//   dispatch(setNotificationTimed(`you voted '${anecdote.content}'`, 5))
// }

//   return (
//     <div>
//       <h2>Anecdotes</h2>
//       {visible.map(anecdote => (
//         <div key={anecdote.id}>
//           <div>{anecdote.content}</div>
//           <div>
//             has {anecdote.votes}
//             <button onClick={() => vote(anecdote)}>vote</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default AnecdoteList



import { useDispatch, useSelector } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotificationTimed } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const visible = [...anecdotes]
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(setNotificationTimed(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {visible.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
