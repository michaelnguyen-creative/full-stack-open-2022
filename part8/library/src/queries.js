import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    published
    genres
  }
`

const AUTHOR_DETAILS = gql`
  fragment authorDetails on Author {
    name
    born
    bookCount
  }
`

export const GET_BOOKS = gql`
  ${BOOK_DETAILS}
  query getBooks {
    allBooks {
      ...bookDetails
      author {
        name
      }
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
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
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
  ${AUTHOR_DETAILS}
  query getAuthors {
    allAuthors {
      ...authorDetails
    }
  }
`

export const SET_BIRTHYEAR = gql`
  ${AUTHOR_DETAILS}
  mutation setBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      ...authorDetails
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

export const WHOAMI = gql`
  query whoAmI {
    me {
      username
      favGenre
    }
  }
`

export const SUBSCRIBE_BOOK_ADDED = gql`
  ${BOOK_DETAILS}
  subscription {
    bookAdded {
      ...bookDetails
      author {
        name
      }
    }
  }
`
