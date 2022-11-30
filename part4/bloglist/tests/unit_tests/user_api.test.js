const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const app = require('../../app')
const User = require('../../models/user')
const { getAllUsers } = require('../test_helper')
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
    password: 'm1ch@3l',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
})

test('get all users returns a 200 OK & users are returned as JSON', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('user creation validators', () => {
  test('invalid users will not be created, status code 400 & proper error message returned', async () => {
    const invalidUsers = [
      {
        username: 'test-admin',
        name: 'admin',
        password: 't3',
      },
      {
        username: 'test-admin',
        name: 'admin',
        password: 't3st@adm1n',
      },
    ]

    const resOne = await api
      .post('/api/users')
      .send(invalidUsers[0])
      .expect(400)
    // console.log('respond', res.body)
    expect(resOne.body.error).toBe('password must be at least 3 characters long')

    const resTwo = await api
      .post('/api/users')
      .send(invalidUsers[1])
      .expect(400)
    expect(resTwo.body.error).toMatch(/User validation failed: username: Error, expected `username` to be unique/)

    const allUsers = await getAllUsers()
    expect(allUsers).not.toContainEqual(invalidUsers)
  })

  test('valid users return 201 Created', async () => {
    const validUser = {
      username: 'bernido212',
      name: 'Bernido',
      password: '89@dhjgnk&',
    }

    await api
      .post('/api/users')
      .send(validUser)
      .expect(201)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
