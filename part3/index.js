const express = require('express')
const app = express()

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

app.get('/info', (request, response)=>{
    let numOfNotes = notes.length;
    const d = new Date().toString();
    console.log(d);

    response.send(`<h3>Phonebook has info for ${numOfNotes} people</h3>
        <h3>${d}</h3>`)
})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log("Hey there! ")
})