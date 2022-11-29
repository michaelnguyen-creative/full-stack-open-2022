const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' })

  return next()
}

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

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(400).send({ error: 'Bad request' })
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).send({
      error: 'invalid token',
      detail: err.message,
    })
  }

  return next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
