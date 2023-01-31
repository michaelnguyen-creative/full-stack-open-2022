import { gql } from 'graphql-tag'

export const typeDefs = gql`
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

type User {
  username: String!
  favGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  authorCount: Int!
  bookCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  me: User
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book!
  editAuthor(name: String!, born: Int!): Author
  createUser(
    username: String!
    favGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`