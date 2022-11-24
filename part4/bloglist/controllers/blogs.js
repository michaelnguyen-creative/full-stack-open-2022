const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { body } = req

  if (body.title === undefined || body.url === undefined) {
    res.status(400).send({ error: 'Missing title and/or URL' })
  } else {
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
  }
})

module.exports = blogsRouter
