import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, loggedUser, updateLike, deleteBlog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const { url, title, author, user, id } = blog

  const dispatch = useDispatch()

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
      id,
      likes: likes + 1,
    })
    setLikes(likes + 1)
    // dispatch({ type: 'blogs/incrementLike', payload: id })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      deleteBlog(id)
      dispatch({ type: 'blogs/removeBlog', payload: id })
    }
  }

  return (
    <div className='blog'>
      {!showDetail ? (
        <div role="blog-view">
          {title} {author}
          <button className="view" onClick={() => setShowDetail(true)}>
            view
          </button>
        </div>
      ) : (
        <div className='blog-details' style={showDetail ? showAllDetail : hideAllDetail}>
          <div role="blog-hide">
            {title} {author}
            <button onClick={() => setShowDetail(false)}>hide</button>
          </div>
          <div role="blog-remove">
            <div>{url}</div>
            <div>
              {`likes: ${likes}`}{' '}
              <button className="like" onClick={handleLike}>
                like
              </button>
            </div>
            <div>{user !== undefined && user.name}</div>
            <div style={{ display: loggedUser === user.name ? '' : 'none' }}>
              <button className='remove' onClick={handleRemove}>remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.string.isRequired,
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
