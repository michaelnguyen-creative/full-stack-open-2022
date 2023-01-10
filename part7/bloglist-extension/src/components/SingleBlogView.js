import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Link,
  Button,
  TextField,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const SingleBlogView = ({ addComment, updateLike, deleteBlog }) => {
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

  const handleComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    e.target.comment.value = ''
    addComment(comment, blog.id)
  }

  return (
    <>
      {!blog ? (
        <p>Blog unavailable</p>
      ) : (
        <div role="blog-remove">
          <Grid container spacing={2} direction="column">
            <Grid item xs={6} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h4">{blog.title}</Typography>
                  <Link href={blog.url}>{blog.url}</Link>
                </CardContent>
                <CardContent>
                  <div style={{ display: 'inline-block' }}>
                    <Typography>{`Likes: ${blog.likes}`}</Typography>
                    <Button
                      className="like"
                      onClick={handleLike}
                      startIcon={<ThumbUpIcon />}
                    >
                      like
                    </Button>
                  </div>
                  <Typography>{`Added by ${blog.user.name}`}</Typography>
                  <div style={{ display: isUserLoggedIn ? '' : 'none' }}>
                    <Button className="remove" onClick={handleRemove}>
                      remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ margin: 2 }}>comments</Typography>
              <form onSubmit={handleComment}>
                <Grid item sx={{ margin: 2 }}>
                  <TextField type="text" name="comment" />
                </Grid>
                <Grid item sx={{ margin: 2 }}>
                  <Button type="submit" variant="contained">
                    add comment
                  </Button>
                </Grid>
              </form>
              <ul>
                {blog.comments.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  )
}

SingleBlogView.propTypes = {
  updateLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default SingleBlogView
