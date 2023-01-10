import { useField } from '../hooks/index'
import PropTypes from 'prop-types'
import { Grid, TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const { reset: titleReset, ...title } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: urlReset, ...url } = useField('text')

  const addNewBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <form onSubmit={addNewBlog}>
      <h3>Create new blog</h3>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField id="title-input" label="title" {...title} />
        </Grid>
        <Grid item>
          <TextField id="author-input" label="author" {...author} />
        </Grid>
        <Grid item>
          <TextField id="url-input" label="url" {...url} />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">create</Button>
        </Grid>
      </Grid>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
