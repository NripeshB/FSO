import NewAnecdote from './components/NewAnecdotes'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
const App = () => {
  // const anecdotes = useSelector(state => state)
  
  return (
    <div>
      <Filter/>
      <AnecdoteList/>
      <NewAnecdote/>
    </div>
  )
}

export default App
