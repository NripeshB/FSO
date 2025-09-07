import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newNumber, setNewNumber] = useState('') 
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')   

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleOnClick = (event) => {
    event.preventDefault()
    if (newName === "") {
      alert("Enter a valid name")
    } else if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      const newNameObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newNameObj))
      setNewName("")
      setNewNumber("")
    }
  }
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div>

      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleOnClick}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default App
