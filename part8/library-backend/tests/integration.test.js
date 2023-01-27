import { url } from '../index.js'
import { beforeEach, after, describe } from 'mocha'
import { authorSetup, bookSetup, userSetup } from '../utils/mongo_helper.js'
import req from 'supertest'
import { assert, expect } from 'chai'

const CREATE_USER = {
  query: `mutation createUser(
    $username: String!
    $favGenre: String!
  ) {
    createUser(
      username: $username
      favGenre: $favGenre
    ) {
      username
      favGenre
    }
  }`,
  variables: {
    username: 'test',
    favGenre: 'test',
  },
}

const LOGIN = {
  query: `mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }`,
  variables: {
    username: 'test',
    password: 'password',
  },
}

const ADD_BOOK = {
  query: `mutation addBook(
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
  }`,
  variables: {
    title: 'test',
    author: 'test',
    published: 2022,
    genres: ['test'],
  },
}

describe('apollo server', function () {
  beforeEach(async function () {
    await authorSetup()
    await bookSetup()
    await userSetup()
  })

  describe('queries', function () {
    it('authorCount returns 5', async function () {
      const AUTHOR_COUNT = {
        query: `query authorCount {
          authorCount
        }`,
      }
      const res = await req(url).post('/').send(AUTHOR_COUNT)
      assert.propertyVal(res.body.data, 'authorCount', 5)
    })
    it('me returns current user', async function () {
      await req(url).post('/').send(CREATE_USER)
      const resWithToken = await req(url).post('/').send(LOGIN)
      const tokenValue = resWithToken.body.data.login.value

      const ME = {
        query: `query me {
          me {
            username
            favGenre
          }
        }`,
      }
      const res = await req(url)
        .post('/')
        .auth(tokenValue, { type: 'bearer' })
        .send(ME)
      expect(res.body.data.me).to.deep.equal({
        username: 'test',
        favGenre: 'test',
      })
    })
  })

  describe('mutations', function () {
    describe('user & login', function () {
      it('createUser returns user', async function () {
        const res = await req(url).post('/').send(CREATE_USER)
        assert.deepEqual(res.body.data.createUser, {
          username: 'test',
          favGenre: 'test',
        })
      })
      it('login with valid credentials returns a token', async function () {
        await req(url).post('/').send(CREATE_USER)
        const res = await req(url).post('/').send(LOGIN)
        assert.isString(res.body.data.login.value)
      })
    })

    describe('add book & edit author birth year', function () {
      let tokenValue
      beforeEach(async function () {
        await req(url).post('/').send(CREATE_USER)
        const resWithToken = await req(url).post('/').send(LOGIN)
        tokenValue = resWithToken.body.data.login.value
      })
      it('only signed in user could add a new book', async function () {
        const res = await req(url)
          .post('/')
          .auth(tokenValue, { type: 'bearer' })
          .send(ADD_BOOK)
        expect(res.body.data.addBook).to.deep.equal({
          title: 'test',
          author: {
            name: 'test',
          },
          published: 2022,
          genres: ['test'],
        })
      })
      it('returns UNAUTHENTICATED error code if user has not signed in', async function () {
        const res = await req(url).post('/').send(ADD_BOOK)
        expect(res.body.errors[0].extensions.code).to.equal('UNAUTHENTICATED')
      })
      it('only signed in user could change author birthyear', async function() {
        const EDIT_BORN = {
          query: `mutation editAuthor(
            $name: String!
            $born: Int!
          ) {
            editAuthor(
              name: $name
              born: $born
            ) {
              name
              born
            }
          }`,
          variables: {
            name: 'Sandi Metz',
            born: 2023,
          }
        }
        const res = await req(url)
          .post('/')
          .auth(tokenValue, { type: 'bearer' })
          .send(EDIT_BORN)
        assert.propertyVal(res.body.data.editAuthor, 'born', 2023)
      })
    })
  })
})
