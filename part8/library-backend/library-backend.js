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
    bookCount: Int!
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
      // TODO
      if (Object.keys(args).length === 0) {
        return Book.find({})
      } else if (args.author && args.genre) {
        return Book.find({ author: args.author, genres: { $in: [args.genre] } })
      } else {
        return Book.find({ $or: [{ author: args.author }, { genres: { $in: [args.genre] } }] })
      }
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => books.filter((b) => b.author === root.name).length
  },
  Book: {
    // TODO
    author: (root) => console.log('root', root)
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
        author.name === args.name ? { ... author, born: args.born } : author
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
