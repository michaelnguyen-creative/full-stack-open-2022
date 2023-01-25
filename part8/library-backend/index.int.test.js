import mongoose from 'mongoose'
import typeDefs from './index.js'
import resolvers from './index.js'
import { ApolloServer } from 'apollo-server'
import { before, beforeEach } from 'mocha'

before(function() {
  mongoose
  .connect(`mongodb+srv://michaelnguyen-creative:7820@cluster0.9tpxnaf.mongodb.net/testApp?retryWrites=true&w=majority`)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error', error.message))
})

describe('', () => {
  beforeEach(function() {
    const testServer = new ApolloServer({
      typeDefs,
      resolvers
    })
  })
})