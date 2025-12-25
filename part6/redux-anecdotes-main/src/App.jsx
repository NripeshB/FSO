import NewAnecdote from './components/NewAnecdotes'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
const App = () => {
  // const anecdotes = useSelector(state => state)
  
  return (
    <div>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <NewAnecdote/>
    </div>
  )
}

export default App
