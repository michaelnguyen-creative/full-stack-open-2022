import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

const SingleBlogView = ({ updateLike, deleteBlog }) => {
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const match = useMatch('/blogs/:blogId')
  const blog = match ? blogs.find((b) => b.id === match.params.blogId) : null

  const handleLike = () => {
    updateLike({
      id: blog.id,
      likes: blog.likes + 1,
    })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const isUserLoggedIn = !user ? null : blog.user.name === user.name

  return (
    <div role="blog-remove">
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {`likes: ${blog.likes}`}{' '}
        <button className="like" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{`added by ${blog.user.name}`}</div>
      <div style={{ display: isUserLoggedIn ? '' : 'none' }}>
        <button className="remove" onClick={handleRemove}>
          remove
        </button>
      </div>
    </div>
  )
}

SingleBlogView.propTypes = {
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default SingleBlogView
