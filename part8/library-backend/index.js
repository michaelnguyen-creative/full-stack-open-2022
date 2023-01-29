import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server'
import { JWT_SECRET, MONGODB_URI } from './utils/config.js'
import { typeDefs } from './src/schema.js'
import { resolvers } from './src/resolvers.js'
import User from './models/user.js'
import { GraphQLError } from 'graphql'

console.log('connecting to MongoDB at', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .catch((error) => console.log('error', error.message))

const getCurrentUser = async (req) => {
  const auth = req.headers.authorization

  let currentUser
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
    currentUser = await User.findById(decodedToken.id)
  }

  return currentUser
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    currentUser: await getCurrentUser(req),
  }),
})

export const { url } = await server.listen({
  port: 4000
})

console.log(`Server ready at ${url}`)
