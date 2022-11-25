const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Setup Global Env',
    author: 'Jest',
    url: 'https://jestjs.io/docs/api',
    likes: 10,
  },
  {
    title: 'Superagent, HTTP request library',
    author: 'Vision Media',
    url: 'https://github.com/visionmedia/superagent',
    likes: 8,
  },
]

const getAllBlogs = async () => Blog.find({})

const getFirstValidId = async () => {
  const blogs = await getAllBlogs()
  return blogs[0].id
}

module.exports = { initialBlogs, getAllBlogs, getFirstValidId }
