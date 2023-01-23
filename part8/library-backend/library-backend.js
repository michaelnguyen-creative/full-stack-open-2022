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
    bookCount: Int
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
        return await Book.find({}).populate('author')
      }
      const foundAuthor = await Author.findOne({ name: args.author })
      if (args.author && args.genre) {
        return Book.find({
          author: foundAuthor._id,
          genres: { $in: [args.genre] },
        }).populate('author')
      }
      return Book.find({
        $or: [{ author: !foundAuthor ? null : foundAuthor._id }, { genres: { $in: [args.genre] } }],
      }).populate('author')
    },
    allAuthors: async () => await Author.find({}),
  },
  Author: {
    bookCount: async (root) => await Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorInfo = await Author.findOne({ name: args.author })
      console.log('ai', authorInfo)
      const createBook = async (authorId) => {
        console.log('aid', authorId)
        const bookToAdd = new Book({
          ...args,
          author: authorId,
        })
        console.log('bta', bookToAdd)
        const addedBook = await (await bookToAdd.save()).populate('author')
        console.log('ab', addedBook)
        return addedBook
      }
      if (authorInfo.length === 0) {
        const authorToCreate = new Author({
          name: args.author,
          born: null,
        })
        const createdAuthor = await authorToCreate.save()
        console.log('ca', createdAuthor)
        return createBook(createdAuthor._id)
      }
      return createBook(authorInfo._id)
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.born
      const editedAuthor = await author.save()
      console.log('ea', editedAuthor)
      return editedAuthor
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
