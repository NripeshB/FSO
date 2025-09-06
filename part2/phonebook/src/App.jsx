import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
const handleChange = (event)=>{
  setNewName(event.target.value)
}
const handleOnClick = (event)=>{
  event.preventDefault()
  if(newName ===""){
    alert("Enter a valid name")
  }
  else{
const newNameObj = {
    name: newName
  }
  setPersons(persons.concat(newNameObj))
  setNewName("")
  }
  
  
}
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit" onClick={handleOnClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}> {person.name}</div>
      ))}
    </div>
  )
}

export default App