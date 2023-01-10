import { useField } from '../hooks/index'
import PropTypes from 'prop-types'

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
      <div>
        <label htmlFor="title-input">title</label>
        <input id="title-input" {...title} />
      </div>
      <div>
        <label htmlFor="author-input">author</label>
        <input id="author-input" {...author} />
      </div>
      <div>
        <label htmlFor="url-input">url</label>
        <input id="url-input" {...url} />
      </div>
      <button className="create" type="submit">
        create
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
