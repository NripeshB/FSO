const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {

  const blog = new Blog(request.body)
  
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'title and url are required' })
  }


  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter