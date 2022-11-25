const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('test get api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
  })

  test('blogs _id prop are replaced by id', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body.map((b) => b.id)).toBeDefined()
  })
})

describe('test post api', () => {
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

    const allBlogs = await helper.getAllBlogs()

    expect(allBlogs).toContainEqual(expect.objectContaining(newBlog))
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
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

    const allBlogs = await helper.getAllBlogs()
    const returnedBlog = allBlogs.find((b) => b.url === newBlog.url)
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
})

describe('deleting a blog by id', () => {
  test('valid id returns 204 No Content', async () => {
    const validId = await helper.getFirstValidId()
    console.log('valid id:', validId)
    await api
      .delete(`/api/blogs/${validId}`)
      .expect(204)
  })

  test('invalid id returns 400 Bad Request', async () => {
    const invalidId = 'dfad9dfad0dfadfad'
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('test put api', () => {
  test('updating a valid id returns 200 OK', async () => {
    const validId = await helper.getFirstValidId()
    const likesToUpdate = { likes: 40 }

    await api
      .put(`/api/blogs/${validId}`)
      .send(likesToUpdate)
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
