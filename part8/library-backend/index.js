import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import bodyParser from 'body-parser'

import { typeDefs } from './src/schema.js'
import { resolvers } from './src/resolvers.js'

import User from './models/user.js'
import { MONGODB_URI } from './utils/config.js'

const connectToMongoDb = async () => {
  console.log('connecting to MongoDB at', MONGODB_URI)
  try {
    mongoose.connect(MONGODB_URI)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error', error.message)
  }
}

connectToMongoDb()

const getCurrentUser = async (req) => {
  const auth = req.headers.authorization
  let currentUser = null

  if (auth && auth.toLowerCase().startsWith('bearer')) {
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
    currentUser = await User.findById(decodedToken.id)
  }

  return currentUser
}

const startApolloServer = async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const app = express()
  const httpServer = http.createServer(app)

  const wss = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })
  const serverCleanup = useServer({ schema }, wss)

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await apolloServer.start()

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        currentUser: await getCurrentUser(req),
      }),
    })
  )

  const PORT = 4000
  httpServer.listen(PORT, () =>
    console.log(`Server's ready at http://localhost:${PORT}/graphql`)
  )
}

startApolloServer()
