const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blog_routes')
const usersRouters = require('./controllers/users')
const loginRouter = require('./controllers/login')
// const errorHandler = require('./middlewares/errorHandler')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

  const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'MongoServerError'  && error.code === 11000){
    return response.status(400).json({error: 'The username wasnt unique'})
  }

  next(error)
}
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouters)
app.use('/api/login', loginRouter)
app.use(errorHandler)
module.exports = app