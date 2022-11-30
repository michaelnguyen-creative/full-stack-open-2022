const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../../app')
const Blog = require('../../models/blog')
const User = require('../../models/user')
const helper = require('../test_helper')

const api = supertest(app)

beforeEach(async () => {
  // Blog database prep
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  // User database prep
  await User.deleteMany({})
  const usersHashed = helper.initialUsers
    .map(({ password }) => bcrypt.hash(password, 10))
  await User.insertMany(usersHashed)
})

// Integration tests
describe('adding a new blog with token-based authn', () => {
  test('login successfully, created a new blog', async () => {
    const initialBlogs = await helper.getAllBlogs()
    const receivedToken = await api
      .post('/api/login')
      .send({
        username: 'robert-c',
        password: '3m3r0n',
      })
      .expect(200)
    expect(receivedToken).toBeDefined()

    const savedBlog = await api
      .post('/api/blogs')
      .auth(receivedToken.token, { type: 'bearer' })
      .send({
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      })
      .expect(201)

    const allBlogs = await helper.getAllBlogs()
    console.log('all', allBlogs)

    // expect(allBlogs).toHaveLength(initialBlogs.length + 1)
    // expect(savedBlog.user).toBe()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
