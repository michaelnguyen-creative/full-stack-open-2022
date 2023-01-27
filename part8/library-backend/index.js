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
  if (!req.headers.authorization) return null
  const auth = req ? req.headers.authorization : null
  let decodedToken
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
  }
  const currentUser = await User.findById(decodedToken.id)
  if (!currentUser)
    throw new GraphQLError('you must be logged in', {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    })
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
