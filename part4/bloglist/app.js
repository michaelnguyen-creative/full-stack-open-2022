const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to MongoDB', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => config.info('connected to MongoDB'))

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
