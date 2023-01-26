import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server'
import { MONGODB_URI } from './utils/config.js'
import { typeDefs } from './src/schema.js'
import { resolvers } from './src/resolvers.js'

console.log('connecting to MongoDB at', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error', error.message))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
