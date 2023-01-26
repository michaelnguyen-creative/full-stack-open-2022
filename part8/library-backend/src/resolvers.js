import { GraphQLError } from 'graphql'
import Book from '../models/book.js'
import Author from '../models/author.js'
import User from '../models/author.js'
import jwt from 'jsonwebtoken'

export const resolvers = {
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
      const createBook = async (authorId) => {
        const bookToAdd = new Book({
          ...args,
          author: authorId,
        })
        let addedBook
        try {
          addedBook = await (await bookToAdd.save()).populate('author')
        } catch(err) {
          throw new GraphQLError(err.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            }
          })
        }
        return addedBook
      }
      if (authorInfo.length === 0) {
        const authorToCreate = new Author({
          name: args.author,
          born: null,
        })
        const createdAuthor = await authorToCreate.save()
        return createBook(createdAuthor._id)
      }
      return createBook(authorInfo._id)
    },
    editAuthor: async (root, args) => {
      let author
      try {
        await Author.findOne({ name: args.name })
        author.born = args.born
        await author.save()
      } catch(err) {
          throw new GraphQLError(err.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
            }
          })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favGenre: args.favGenre
      })
      await user.save()
      return user
    }
  },
}