const listHelper = require('../utils/list_helpers')

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
  test('sum of all likes of six blogs is 36', () => {
    expect(listHelper.totalLikes(listHelper.blogs)).toBe(36)
  })
})

describe('most liked', () => {
  test('blog with the most likes', () => {
    expect(listHelper.favoriteBlog(listHelper.blogs)).toEqual(listHelper.blogs[2])
  })
})

// Most blogs
describe('most blogs', () => {
  test('author with the most blogs', () => {
    expect(listHelper.mostBlogs(listHelper.blogs)).toMatchObject({ author: 'Robert C. Martin', blogs: 3 })
  })
})

// Most likes
describe('most likes', () => {
  test('author with the most likes', () => {
    expect(listHelper.mostLikes().likes).toBe(12)
  })
})
