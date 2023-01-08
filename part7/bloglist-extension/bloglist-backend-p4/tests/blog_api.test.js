const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  // Blog database prep
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  // User database prep
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('3m3r0n', 10)
  const user = new User({
    username: 'robert-c',
    name: 'Robert C. Martin',
    passwordHash,
  })
  await user.save()
  // console.log('user', savedUser)
})

describe('getting all blogs api', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect('Content-Type', /application\/json/)
  })

  test('blogs _id prop are replaced by id', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body.map((b) => b.id)).toBeDefined()
  })
})

describe('adding a new blog api', () => {
  test('new blog is created with valid token', async () => {
    const initialBlogs = await helper.getAllBlogs()
    const newBlog = {
      title: "Murphy's law",
      author: 'Wiki',
      url: 'https://en.wikipedia.org/wiki/Murphy%27s_law',
      likes: 100,
    }

    const receivedToken = await api
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'robert-c',
        password: '3m3r0n',
      })
    expect(receivedToken.body.token).toEqual(expect.anything())

    await api
      .post('/api/blogs')
      .auth(receivedToken.body.token, { type: 'bearer' })
      .send(newBlog)
      .expect(201)
    const allBlogs = await helper.getAllBlogs()
    expect(allBlogs).toHaveLength(initialBlogs.length + 1)
  })

  test('if likes prop is missing, it will default to 0', async () => {
    const newBlog = {
      title: "Murphy's law",
      author: 'Wiki',
      url: 'https://en.wikipedia.org/wiki/Murphy%27s_law',
    }

    const receivedToken = await api
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'robert-c',
        password: '3m3r0n',
      })
    expect(receivedToken.body.token).toEqual(expect.anything())

    const returnedBlog = await api
      .post('/api/blogs')
      .auth(receivedToken.body.token, { type: 'bearer' })
      .send(newBlog)
      .expect(201)
    // Keep it simple, stupid (KISS principle)
    expect(returnedBlog.body.likes).toEqual(0)
  })

  test('create a new blog without title & url will return a 400 Bad Request status code', async () => {
    const newBlog = {
      author: 'Wiki',
      likes: 22,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('adding a new blog fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: "Murphy's law",
      author: 'Wiki',
      url: 'https://en.wikipedia.org/wiki/Murphy%27s_law',
      likes: 100,
    }

    await api
      .post('/api/blogs')
      .auth(null, { type: 'bearer' })
      .send(newBlog)
      .expect(401)
  })
})

describe('deleting a blog by id', () => {
  test('valid id returns 204 No Content', async () => {
    const validId = await helper.getFirstValidId()
    console.log('valid id:', validId)
    await api.delete(`/api/blogs/${validId}`).expect(204)
  })

  test('invalid id returns 400 Bad Request', async () => {
    const invalidId = 'dfad9dfad0dfadfad'
    await api.delete(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('updating a blog api', () => {
  test('updating a valid id returns 200 OK', async () => {
    const validId = await helper.getFirstValidId()
    const likesToUpdate = { likes: 40 }

    await api.put(`/api/blogs/${validId}`).send(likesToUpdate).expect(200)
  })
})

describe('add a new comment', () => {
  test.only('returns 204 created & correct new comment', async () => {
    const validBlogId = await helper.getFirstValidId()
    const comment = 'test comment'

    const res = await api
      .post(`/api/blogs/${validBlogId}/comments`)
      .send({ data: comment })
      .expect(201)
    expect(res.body.comments).toContain(comment)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
