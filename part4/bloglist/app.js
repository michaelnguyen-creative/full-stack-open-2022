const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./models/user')

const app = express()

logger.info('connecting to MongoDB', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
