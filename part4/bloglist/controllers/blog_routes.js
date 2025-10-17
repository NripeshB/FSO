const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const { tokenExtractor, userExtractor } = require('../middleware/tokenEx')

blogsRouter.get('/', async(request, response) => {
  const Blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    response.json(Blogs)
})


blogsRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !url) {
    return res.status(400).json({ error: 'title and url are required' })
  }
  
  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(401).json({ error: 'invalid user' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id 
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user',{username: 1, name: 1})

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter