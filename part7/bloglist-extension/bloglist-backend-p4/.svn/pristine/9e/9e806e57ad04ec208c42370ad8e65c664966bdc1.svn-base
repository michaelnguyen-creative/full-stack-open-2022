const Blog = require('../models/blog')
const User = require('../models/user')

// Blogs
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

const testBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const getAllBlogs = async () => Blog.find({})

const getFirstValidId = async () => {
  const blogs = await getAllBlogs()
  return blogs[0].id
}

// Users
const initialUsers = [
  {
    username: 'test-admin',
    name: 'admin',
    password: 't6st-p@ssw0rd',
  },
  {
    username: 'robert-c',
    name: 'Robert C. Martin',
    password: '3m3r0n',
  },
  {
    username: 'michael-ng',
    name: 'Michael Nguyen',
    password: 'm1ch@3l',
  },
]

const getAllUsers = async () => User.find({})
const getUserById = async (id) => User.findById(id)

module.exports = {
  initialBlogs,
  getAllBlogs,
  getFirstValidId,
  initialUsers,
  getAllUsers,
  getUserById,
  testBlogs,
}
