const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
// const helper = require('./user_helper')

const api = supertest(app)

beforeEach(async () => {
  // Query with model
  await User.deleteMany({})

  // Save new document with document
  const passwordHash = await bcrypt.hash('t6st-p@ssw0rd', 10)
  const user = new User({
    username: 'test-admin',
    name: 'admin',
    passwordHash,
  })
  await user.save()
})

test('successfully create a new user with status code 201', async () => {
  const newUser = {
    username: 'michael-ng',
    name: 'Michael Nguyen',
    password: '332132-23jd',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
})

afterAll(() => {
  mongoose.connection.close()
})
