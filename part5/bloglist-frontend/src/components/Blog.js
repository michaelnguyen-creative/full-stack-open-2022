import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false)
  const { url, likes, title, author, user } = blog
  
  const showAllDetail = {
    display: showDetail ? 'flex' : 'none',
    flexDirection: 'column',
    border: '1px solid black',
    padding: '10px',
    margin: ' 5px 0 5px 0',
  }
  const hideAllDetail = { display: showDetail ? 'none' : '' }

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
          <div>{`likes: ${likes}`} <button>like</button></div>
          <div>{user !== undefined && user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog
