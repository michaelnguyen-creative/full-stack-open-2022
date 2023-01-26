import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server'
import { typeDefs } from '../src/schema.js'
import { resolvers } from '../src/resolvers.js'
import { MONGODB_URI } from '../utils/config.js'
import { beforeEach, after } from 'mocha'
import { authorSetup, bookSetup } from '../utils/mongo_helper.js'
import req from 'supertest'
import { assert, expect } from 'chai'

console.log('TEST: connecting to MongoDB at', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('TEST: connected to MongoDB'))
  .catch((error) => console.log('error', error.message))

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url, server } = await testServer.listen({
  port: 4001
})
console.log(`TEST: Server ready at ${url}`)

describe('apollo server', function () {
  beforeEach(async function () {
    await authorSetup()
    await bookSetup()
  })
  it('returns 5 for authorCount query', async function () {
    const AUTHOR_COUNT = {
      query: `query authorCount {
        authorCount
      }`,
    }
    const res = await req(url).post('/').send(AUTHOR_COUNT)
    assert.propertyVal(res.body.data, 'authorCount', 5)
  })
})

after(function() {
  server.close()
})
