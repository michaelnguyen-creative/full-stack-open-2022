import { ApolloServer, gql } from 'apollo-server'
import mongoose from 'mongoose'
import Book from './models/book.js'
import Author from './models/author.js'
import { v1 as uuidv1 } from 'uuid'

const MONGODB_URI = `mongodb+srv://michaelnguyen-creative:lM6g7yltO01zaeqR@cluster0.9tpxnaf.mongodb.net/libraryApp?retryWrites=true&w=majority`

console.log('connecting to MongoDB at', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error', error.message))

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, born: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: async () => Author.estimatedDocumentCount(),
    bookCount: async () => Book.estimatedDocumentCount(),
    allBooks: async (root, args) => {
      if (Object.keys(args).length === 0) {
        return Book.find({}).populate('author')
      }
      const foundAuthor = await Author.findOne({ name: args.author })
      if (args.author && args.genre) {
        return Book.find({
          author: foundAuthor._id,
          genres: { $in: [args.genre] },
        })
      }
      return Book.find({
        $or: [{ author: foundAuthor._id }, { genres: { $in: [args.genre] } }],
      })
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      let authorsWithBookCount = []
      authors.forEach(async ({ _id, name, born }) => {
        const bookCount = await Book.countDocuments({ author: _id })
        // console.log('bc', bookCount)
        authorsWithBookCount.push({
          _id,
          name,
          born,
          bookCount
        })
        // console.log('a', authorsWithBookCount)
      })
      // console.log(authorsWithBookCount)
      return authorsWithBookCount
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const bookObj = {
        ...args,
        id: uuidv1(),
      }
      books = books.concat(bookObj)
      authors = authors.concat({
        name: args.author,
        id: uuidv1(),
      })
      return bookObj
    },
    editAuthor: (root, args) => {
      authors = authors.map((author) =>
        author.name === args.name ? { ...author, born: args.born } : author
      )

      return authors.find((a) => a.name === args.name)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
