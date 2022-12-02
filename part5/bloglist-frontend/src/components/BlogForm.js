const BlogForm = ({ addNewBlog, title, setTitle, author, setAuthor, url, setUrl }) => (
  <form onSubmit={addNewBlog}>
    <h2>Create new blog</h2>
    <div>
      title
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm