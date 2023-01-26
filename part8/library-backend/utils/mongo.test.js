import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import { before, beforeEach } from 'mocha'
import chai from 'chai'
import { authorSetup, bookSetup } from './mongo_helper.js'
import Author from '../models/author.js'
import Book from '../models/book.js'

before(function () {
  const MONGODB_URI =
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('connected to MongoDB'))
    .catch((error) => console.log('error', error.message))
})

describe('on setup', () => {
  beforeEach(async function () {
    await authorSetup()
    await bookSetup()
  })
  it('mongodb has correct number of initial data', async function() {
    const authors = await Author.find({})
    const books = await Book.find({})
    chai.expect(authors).to.have.lengthOf(5)
    chai.expect(books).to.have.lengthOf(7)
  })
})
