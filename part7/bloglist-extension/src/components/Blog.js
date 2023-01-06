import { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const user = useSelector(({ user }) => user)
  const [showDetail, setShowDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showAllDetail = {
    display: showDetail ? 'flex' : 'none',
    flexDirection: 'column',
    border: '1px solid black',
    padding: '10px',
    margin: ' 5px 0 5px 0',
  }
  const hideAllDetail = { display: showDetail ? 'none' : '' }

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
    <div className="blog">
      {!showDetail ? (
        <div role="blog-view">
          {blog.title} {blog.author}
          <button className="view" onClick={() => setShowDetail(true)}>
            view
          </button>
        </div>
      ) : (
        <div
          className="blog-details"
          style={showDetail ? showAllDetail : hideAllDetail}
        >
          <div role="blog-hide">
            {blog.title} {blog.author}
            <button onClick={() => setShowDetail(false)}>hide</button>
          </div>
          <div role="blog-remove">
            <div>{blog.url}</div>
            <div>
              {`likes: ${likes}`}{' '}
              <button className="like" onClick={handleLike}>
                like
              </button>
            </div>
            <div>{blog.user.name}</div>
            <div
              style={{ display: blog.user.name === user.name ? '' : 'none' }}
            >
              <button className="remove" onClick={handleRemove}>
                remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
