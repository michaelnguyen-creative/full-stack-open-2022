const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const returnedUser = await User.findOne({ username })
  // Check provided password against password hash stored in db
  const passwordCorrect = bcrypt.compare(password, returnedUser.passwordHash)

  if (passwordCorrect) {
    const token = jwt.sign(
      {
        username: returnedUser.username,
        id: returnedUser._id,
      },
      process.env.SECRET,
      { expiresIn: 60 * 60 },
    )
    res.status(200).send({
      token,
      username: returnedUser.username,
      name: returnedUser.name,
    })
  } else if (!(returnedUser || passwordCorrect)) {
    res.status(401).json({ error: 'invalid username/password' })
  }
})

module.exports = loginRouter
