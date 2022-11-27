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

const User = require('../models/user')

const initialUsers = [
  {
    username: 'michael-ng',
    name: 'Michael Nguyen',
    password: '332132-23jd',
  },
  {
    username: 'bernido212',
    name: 'Bernido',
    password: '89@dhjgnk&',
  },
  {
    username: 'john-bptst',
    name: 'John Baptist',
    password: 'dd0$$jk1',
  },
]

const getAllUsers = async () => User.find({})

module.exports = {
  initialBlogs,
  getAllBlogs,
  getFirstValidId,
  initialUsers,
  getAllUsers,
}
