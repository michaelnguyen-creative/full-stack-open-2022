const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const dummy = () => 1

const totalLikes = (blogListArr) => blogListArr.reduce((acc, { likes }) => acc + likes, 0)

const favoriteBlog = (blogListArr) => {
  const maxLike = blogListArr.reduce((acc, blog) => {
    if (blog.likes >= acc) {
      acc = blog.likes
    }
    return acc
  }, 0)

  return blogListArr.find((blog) => blog.likes === maxLike)
}

// mostBlogs, returns author
const mostBlogs = (blogListArr) => {
  // Algorithm:
  // 1. Generate an array of all authors
  // 2. Then count the number of times an author appear
  // 3. The one appears the most frequently === result
  const counted = blogListArr.reduce((acc, { author }) => {
    const currCount = acc[author] ?? 0
    return ({ ...acc, [author]: currCount + 1 })
  }, {})
  // console.log('counted', counted)

  return Object.keys(counted).reduce((a, b) => (
    counted[a] > counted[b]
      ? { author: a, blogs: counted[a] }
      : { author: b, blogs: counted[b] }
  ))
  // console.log('keys', authorWithMostBlogs)
}

// mostLikes, returns author
const mostLikes = () => {
  const authorWithMostLikes = blogs.reduce((prev, { author, likes }) => (likes > prev.likes
    ? { author, likes }
    : prev))
  return authorWithMostLikes
}

module.exports = { blogs, dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

/* // Think about reduce in these two ways

// 1. Shorthand syntax
// Often used to compare stuff
// or aggregate operations (min, max, avg etc.)
// return a single result
Array.reduce((previousValue, currenrValue) => (
  // some operations, no initial value
  previousValue + currenrValue
))

// 2. Normal syntax
// Often used to perform transformations
// like turning arrays into objects
// counting instances of values in an object etc.
Array.reduce((accumulator, currentValue) => (
  // with intial value
  // that can be used to specify the kind of structure we want
  accumulator + currentValue), initialValue)
 */
