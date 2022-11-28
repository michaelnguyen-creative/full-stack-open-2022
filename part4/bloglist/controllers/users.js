const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  // Password validation
  if (password.length >= 3) {
    // Hashing password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    // process password, generate password hashes
    // which will be saved to the database
    // Use bcrypt library to implement hash function
    // This is for user authentication purpose
    })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } else {
    res.status(400).send({ error: 'password must be at least 3 characters long' })
  }
})

usersRouter.get('/', async (req, res) => {
  const allUsers = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  res.status(200).json(allUsers)
})

module.exports = usersRouter
