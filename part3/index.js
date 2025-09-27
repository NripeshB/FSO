const express = require('express');
const morgan = require('morgan');
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json()); 
app.use(express.static('dist'))
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
    response.json(notes)
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
    const note = {
        id: String(Math.floor(Math.random() * 999999999)),
        name: body.name,
        number: body.number
    }
    notes = notes.concat(note)
    response.json(notes)
    
})

app.get('/info', (request, response)=>{
    let numOfNotes = notes.length;
    const d = new Date().toString();
    console.log(d);

    response.send(`<h3>Phonebook has info for ${numOfNotes} people</h3>
        <h3>${d}</h3>`)
})
app.get('/api/persons/:id', (request, response)=>{
    const id = request.params.id
    const note = notes.find(note=> note.id ===id)
    if(note){
        response.json(note)
    }
    else{
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response)=>{
    const id = request.params.id
    notes = notes.filter(note=> note.id !==id)
    
    response.status(204).end()
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
