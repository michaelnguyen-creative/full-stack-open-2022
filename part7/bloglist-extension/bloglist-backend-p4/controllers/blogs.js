const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  if (title === '' || url === '') {
    res.status(400).send({ error: 'Missing title and/or URL' })
  } else if (req.token === null) {
    return res.status(401).send({ error: 'token missing' })
  }

  const user = await User.findById(req.user._id)
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    // DO this, refer to Mongo document by _id
    user: req.user._id,
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return res.status(201).json(savedBlog)
})

// Delete by ID functionality
blogsRouter.delete('/:id', async (req, res) => {
  if (req.token === null || req.user === null) {
    return res.status(401).send({ error: 'invalid user/token' })
  }

  const removedBlog = await Blog.findByIdAndRemove(req.params.id)
  return res.status(204).json(removedBlog).end()
})

// Update amount of likes by ID
blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body
  await Blog.findByIdAndUpdate(req.params.id, { likes }, { new: true })
  res.status(200).end()
})

// Add comments to blog by blogId
blogsRouter.post('/:id/comments', async (req, res) => {
  const blogId = req.params.id
  const comment = req.body.data
  const blog = await Blog.findById(blogId)
  blog.comments.push(comment)
  const blogWithNewComment = await blog.save()

  res.status(201).send(blogWithNewComment)
})

module.exports = blogsRouter
