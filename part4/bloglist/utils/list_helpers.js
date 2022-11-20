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

module.exports = { dummy, totalLikes, favoriteBlog }
