const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  passwordHash: String,
  // blogs: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Blog',
  //   },
  // ],
})

// Transform _id to id & delete sensitive info
userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
    delete obj.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
