import { useEffect, useState } from 'react'
import axios from 'axios'
const PersonForm = ({handleNameChange,handleNumberChange,newName,newNumber,handleOnClick}) => {
  return (<>
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
  </>)
}

const Persons = ({personsToShow})=>{
  return(
    personsToShow.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))
  )
  
}
const Filter = ({filter, handleFilterChange})=>{
      return(
          <div>
            filter shown with: <input value={filter} onChange={handleFilterChange} />
          </div>
      )
      
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newNumber, setNewNumber] = useState('') 
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')   

  const usePhoneBookData = ()=>{
    return(
      axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      console.log(response.data)
      setPersons(response.data)
    })
    )
  }
  useEffect(usePhoneBookData, [])

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
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      {/* <div>
        filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div> */}
      <PersonForm handleNameChange = {handleNameChange} newName = {newName}
      handleNumberChange = {handleNumberChange} newNumbe={newNumber}
      handleOnClick = {handleOnClick}>

      </PersonForm>
      {/* <form>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleOnClick}>add</button>
        </div>
      </form> */}

      <h2>Numbers</h2>
      <Persons   personsToShow={personsToShow}></Persons>
      {/* {personsToShow.map(person => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))} */}
    </div>
  )
}

export default App
