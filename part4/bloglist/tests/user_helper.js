const User = require('../models/user')

const initialUsers = [
  {
    username: 'michael-ng',
    name: 'Michael Nguyen',
    password: '332132-23jd',
  },
  {
    username: 'bernido212',
    name: 'Bernido',
    password: '89@dhjgnk&',
  },
  {
    username: 'john-bptst',
    name: 'John Baptist',
    password: 'dd0$$jk1',
  },
]

const getAllUsers = async () => User.find({})

module.exports = { initialUsers, getAllUsers }
