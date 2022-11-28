const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes, userId } = req.body

  const user = await User.findById(userId)
  // console.log('userId', userId)
  // console.log('document', user)
  if (title === undefined || url === undefined) {
    res.status(400).send({ error: 'Missing title and/or URL' })
  } else {
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
    console.log('user blogs', user.blogs)
    await user.save()

    res.status(201).json(savedBlog)
  }
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
