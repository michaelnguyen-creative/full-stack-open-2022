const dummy = (blogsArr) => 1

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

// console.log(blogListArr.filter(({ likes }, index, array) => {
//     const max = array.reduce((acc, { curr }) => {
//         while (curr < acc) {
//             acc++
//         } else {
//             acc++
//         }
//         return acc
//     }, 0)

//     likes === max
// }))

module.exports = { dummy, totalLikes, favoriteBlog }
