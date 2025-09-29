require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const path = require('path')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json()); 
app.use(express.static('dist'))
const Person = require('./models/person')
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response)=>{
     Person.find({}).then(persons => {
    response.json(persons)
  })
})
app.post('/api/persons', (request, response)=>{
    const body = request.body
    const doesNameExist = notes.some(person=> person.name === body.name)
    if(!body.name || !body.number){
        return response.status(400).json({
            error: "content missing"
        })
    }
    if(doesNameExist){
        return response.status(400).json({
            error: 'name must be unique' 
        })
    }
    const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
    
})

app.get('/info', (request, response)=>{
    let numOfNotes = notes.length;
    const d = new Date().toString();
    console.log(d);

    response.send(`<h3>Phonebook has info for ${numOfNotes} people</h3>
        <h3>${d}</h3>`)
})
app.get('/api/persons/:id', (request, response)=>{
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response)=>{
    Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
