import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogView = ({ updateLike, deleteBlog }) => {
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const match = useMatch('/blogs/:blogId')
  const blog = match ? blogs.find((b) => b.id === match.params.blogId) : null
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = () => {
    updateLike({
      id: blog.id,
      likes: likes + 1,
    })
    setLikes(likes + 1)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div role="blog-remove">
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {`likes: ${likes}`}{' '}
        <button className="like" onClick={handleLike}>
          like
        </button>
      </div>
      <div>{`added by ${blog.user.name}`}</div>
      <div style={{ display: blog.user.name === user.name ? '' : 'none' }}>
        <button className="remove" onClick={handleRemove}>
          remove
        </button>
      </div>
    </div>
  )
}

BlogView.propTypes = {
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default BlogView
