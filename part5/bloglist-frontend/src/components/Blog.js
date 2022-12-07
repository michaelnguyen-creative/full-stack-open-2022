import { useState } from 'react'

const Blog = ({ blog, updateLike }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const { url, title, author, user, id } = blog
  
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
  }

  return (
    <div>
      {!showDetail ? (
        <div>
          {title} {author} 
          <button onClick={() => setShowDetail(true)}>view</button>
        </div>
      ) : (
        <div style={showDetail ? showAllDetail : hideAllDetail}>
          <div>
            {title} {author} 
            <button onClick={() => setShowDetail(false)}>hide</button>
          </div>
          <div>{url}</div>
          <div>{`likes: ${likes}`} <button onClick={handleLike}>like</button></div>
          <div>{user !== undefined && user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
