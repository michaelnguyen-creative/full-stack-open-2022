const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})

  initialBlogs.map((b) => {
    const blogArrObj = new Blog(b)
    return blogArrObj.save()
  })
})

// Write some tests
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
})

test('blogs _id prop are replaced by id', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body.map((b) => b.id)).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
