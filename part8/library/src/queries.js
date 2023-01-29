import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
query getBooks {
  allBooks {
    title
    author {
      name
      born
      bookCount
    }
    published
    genres
  }
}
`

export const CREATE_NEW_BOOK = gql`
mutation createBook(
  $title: String!
  $author: String!
  $published: Int!
  $genres: [String!]!
) {
  addBook(title: $title
    author: $author
    published: $published
    genres: $genres) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const GET_AUTHORS = gql`
  query getAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation setBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GET_BOOKS_BY_GENRE = gql`
  query getBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`