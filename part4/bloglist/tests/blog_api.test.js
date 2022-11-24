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

test('add a new blog returns the correct content and total length increases by one', async () => {
  const newBlog = {
    title: "Murphy's law",
    author: 'Wiki',
    url: 'https://en.wikipedia.org/wiki/Murphy%27s_law',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const res = await api.get('/api/blogs')

  expect(res.body).toContainEqual(expect.objectContaining(newBlog))
  expect(res.body).toHaveLength(initialBlogs.length + 1)
})

test('if likes prop is missing, it will default to 0', async () => {
  const newBlog = {
    title: "Murphy's law",
    author: 'Wiki',
    url: 'https://en.wikipedia.org/wiki/Murphy%27s_law',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
  const res = await api.get('/api/blogs')
  const returnedBlog = res.body.find((b) => b.url === newBlog.url)
  // Keep it simple, stupid (KISS principle)
  expect(returnedBlog.likes).toEqual(0)
})

test('create a new blog without title & url will return a 400 Bad Request status code', async () => {
  const newBlog = {
    author: 'Wiki',
    likes: 22,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
