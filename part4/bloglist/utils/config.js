require('dotenv').config({ path: './.env' })

const { PORT } = process.env
const { MONGODB_URI } = process.env

module.exports = { PORT, MONGODB_URI }
