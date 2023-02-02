import mongoose from 'mongoose'
import Book from '../models/book.js'
import Author from '../models/author.js'
import User from '../models/user.js'
import { MONGODB_URI } from './config.js'

export const authorSetup = async () => {
  let authors = [
    {
      name: 'Robert Martin',
      id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
      born: 1952,
    },
    {
      name: 'Martin Fowler',
      id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
      born: 1963,
    },
    {
      name: 'Fyodor Dostoevsky',
      id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
      born: 1821,
    },
    {
      name: 'Joshua Kerievsky', // birthyear not known
      id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    },
    {
      name: 'Sandi Metz', // birthyear not known
      id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    },
  ]
  const newAuthors = authors.map(({ name, born }) => {
    return {
      name,
      born,
    }
  })
  await Author.deleteMany({})
  const result = await Author.insertMany(newAuthors)
  console.log('author setup', result)
  return result
}

export const bookSetup = async () => {
  let books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: 'Robert Martin',
      id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
      genres: ['refactoring'],
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: 'Robert Martin',
      id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
      genres: ['agile', 'patterns', 'design'],
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: 'Martin Fowler',
      id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
      genres: ['refactoring'],
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: 'Joshua Kerievsky',
      id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
      genres: ['refactoring', 'patterns'],
    },
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: 'Sandi Metz',
      id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
      genres: ['refactoring', 'design'],
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: 'Fyodor Dostoevsky',
      id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
      genres: ['classic', 'crime'],
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: 'Fyodor Dostoevsky',
      id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
      genres: ['classic', 'revolution'],
    },
  ]
  await Book.deleteMany({})
  const authors = await Author.find({})

  books.forEach(async (b) => {
    const matchedAuthor = authors.find((a) => a.name === b.author)
    const bookInstance = new Book({
      title: b.title,
      published: b.published,
      genres: b.genres,
      author: matchedAuthor && matchedAuthor._id,
    })

    const savedBook = await bookInstance.save()
    return savedBook
  })
}

export const userSetup = async () => {
  await User.deleteMany({})
}

const setupMongoDb = async () => {
  console.log(`connecting to mongodb at ${MONGODB_URI}`)
  mongoose.connect(MONGODB_URI).then(() => console.log('connected to mongodb'))
  await authorSetup()
  await bookSetup()
  console.log('mongodb setup finished')
}

setupMongoDb()