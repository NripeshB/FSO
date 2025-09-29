require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => next(error))
})


app.post('/api/persons', async (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'content missing' })
  }

  try {
    const person = new Person({ name, number })
    const savedPerson = await person.save()

    response.json(savedPerson)
  } catch (error) {
    console.log(error.response.data.error);
    
    next(error)
  }
})


app.put('/api/persons/:id', async (request, response, next) => {
  const { number } = request.body

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      { number },
      { new: true, runValidators: true, context: 'query' }
    )

    if (updatedPerson) {
      response.json(updatedPerson)
    } else {
      response.status(404).json({ error: 'Person not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.get('/info', async (request, response, next) => {
  try {
    const count = await Person.countDocuments({})
    const d = new Date().toString()

    response.send(`<h3>Phonebook has info for ${count} people</h3>
                   <h3>${d}</h3>`)
  } catch (error) {
    next(error)
  }
})
app.get('/api/persons/:id', (request, response, next) => {
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
app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)

    if (!person) {
      return response.status(404).json({ error: 'Person not found' })
    }

    await person.deleteOne()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
