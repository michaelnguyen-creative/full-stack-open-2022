const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

const getTokenFrom = (req) => {
  const authz = req.get('authorization')
  // console.log('authz', authz)
  if (authz && authz.toLowerCase().startsWith('bearer')) {
    return authz.substring(7)
  }
  return null
}

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body
  if (title === undefined || url === undefined) {
    return res.status(400).send({ error: 'Missing title and/or URL' })
  }

  const token = getTokenFrom(req)
  // console.log('token', token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  // console.log('decoded', decodedToken)
  if (!decodedToken.id) {
    return res.status(401).send({ error: 'token missing' })
  }

  const user = await User.findById(decodedToken.id)
  // console.log('userId', userId)
  // console.log('document', user)
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    // DO this, refer to Mongo document by _id
    user: user._id,
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  // console.log('user blogs', user.blogs)
  await user.save()

  return res.status(201).json(savedBlog)
})

// Delete by ID functionality
blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

// Update amount of likes by ID
blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body
  await Blog.findByIdAndUpdate(req.params.id, { likes }, { new: true })
  res.status(200).end()
})

module.exports = blogsRouter
