import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server'
import { typeDefs } from '../src/schema.js'
import { resolvers } from '../src/resolvers.js'
import { MONGODB_URI } from '../utils/config.js'
import { beforeEach, after, describe } from 'mocha'
import { authorSetup, bookSetup, userSetup } from '../utils/mongo_helper.js'
import req from 'supertest'
import { assert, expect } from 'chai'

console.log('TEST: connecting to MongoDB at', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .catch((error) => console.log('error', error.message))

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url, server } = await testServer.listen({
  port: 4001,
})
console.log(`TEST: Server ready at ${url}`)

describe('apollo server', function () {
  beforeEach(async function () {
    await authorSetup()
    await bookSetup()
    await userSetup()
  })

  describe('queries', function () {
    it('authorCount returns 5', async function () {
      const AUTHOR_COUNT = {
        query: `query authorCount {
          authorCount
        }`
      }
      const res = await req(url).post('/').send(AUTHOR_COUNT)
      console.log('r', res.body.data)
      assert.propertyVal(res.body.data, 'authorCount', 5)
    })
  })

  describe('mutations', function () {
    describe('user & login', function () {
      it('createUser returns user', async function () {
        const CREATE_USER = {
          query: `mutation createUser(
            $username: String!
            $favGenre: String!
          ) {
            createUser(
              username: $username
              favGenre: $favGenre
            ) {
              username
              favGenre
            }
          }`,
          variables: {
            username: 'test',
            favGenre: 'test',
          },
        }
        const res = await req(url).post('/').send(CREATE_USER)
        assert.deepEqual(res.body.data.createUser, {
          username: 'test',
          favGenre: 'test',
        })
      })
      it('login with valid credentials returns a token', async function () {
        const CREATE_USER = {
          query: `mutation createUser(
            $username: String!
            $favGenre: String!
          ) {
            createUser(
              username: $username
              favGenre: $favGenre
            ) {
              username
              favGenre
            }
          }`,
          variables: {
            username: 'test',
            favGenre: 'test',
          },
        }
        await req(url).post('/').send(CREATE_USER)

        const LOGIN = {
          query: `mutation login(
            $username: String!
            $password: String!
          ) {
            login(
              username: $username
              password: $password
            ) {
              value
            }
          }`,
          variables: {
            username: 'test',
            password: 'password',
          },
        }

        const res = await req(url).post('/').send(LOGIN)
        assert.isString(res.body.data.login.value)
      })
    })
  })
})

after(function () {
  server.close()
})
