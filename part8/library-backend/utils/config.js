import * as dotenv from 'dotenv'
dotenv.config()

export const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

export const JWT_SECRET = process.env.JWT_SECRET