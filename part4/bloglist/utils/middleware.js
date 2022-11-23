const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(400).send({ error: 'Bad request' })
  }
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message })
  }

  return next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}
