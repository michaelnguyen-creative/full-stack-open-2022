const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const authz = req.get('authorization')
  // console.log('authz', authz)
  if (authz && authz.toLowerCase().startsWith('bearer')) {
    // This is how you add a new field/property to a JS object
    req.token = authz.substring(7)
  } else {
    req.token = null
  }

  return next()
}

const userExtractor = async (req, res, next) => {
  if (req.token === undefined || req.token === null) {
    return next()
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  const returnedUser = await User.findById(decodedToken.id)

  if (returnedUser._id.toString() === decodedToken.id) {
    req.user = returnedUser
  } else {
    req.user = null
  }

  return next()
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' })

  return next()
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(400).send({
      error: 'malformatted id',
      detail: err.message,
    })
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).send({
      error: 'invalid token',
      detail: err.message,
    })
  } else if (err.name === 'TypeError') {
    res.status(400).json({
      error: err.message,
    })
  }

  return next(err)
}

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler,
}
