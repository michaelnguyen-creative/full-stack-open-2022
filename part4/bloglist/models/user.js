const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, 'Must be at least 3 characters long, got {VALUE}'],
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

// Transform _id to id & delete sensitive info
userSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.userId = obj._id.toString()
    delete obj._id
    delete obj.__v
    delete obj.passwordHash
  },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
