import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notif from './components/Notif'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogUser from './components/LogUser'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import SingleUserView from './components/SingleUserView'
import SingleBlogView from './components/SingleBlogView'
import {
  initializeBlogs,
  createBlog,
  updateLike,
  deleteBlog,
  createComment,
} from './reducers/blogReducer'
import { logIn, logOut } from './reducers/userReducer'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, List, ListItem, Typography } from '@mui/material'

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const message = useSelector(({ message }) => message)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Clear localStorage data if there is any
    window.localStorage.clear()
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = (userObj) => {
    dispatch(logIn(userObj))
  }

  const handleLogout = () => {
    dispatch(logOut())
    navigate('/')
  }

  const addNewBlog = (blogObj) => {
    dispatch(createBlog(blogObj))
  }

  const incrementLike = (blogObj) => {
    dispatch(updateLike(blogObj))
    dispatch(initializeBlogs())
  }

  const deleteBlogById = (blogId) => {
    dispatch(deleteBlog(blogId))
    navigate('/blogs')
  }

  const addComment = (comment, blogId) => {
    dispatch(createComment(comment, blogId))
  }

  return (
    <Container>
      <Notif message={message} />
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/users">Users</Button>
          <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
          <LogUser handleLogout={handleLogout} style={{ right: '80' }} />
        </Toolbar>
      </AppBar>
      <h1>Blog app</h1>
      <Routes>
        <Route path="/" element={<p>Home Page</p>} />
        <Route
          path="/login"
          element={
            <>
              <div style={{ display: user === null ? '' : 'none' }}>
                <LoginForm login={handleLogin} />
              </div>
              <div style={{ display: user === null ? 'none' : '' }}>
                <Togglable buttonLabel="new blog">
                  <BlogForm createBlog={addNewBlog} />
                </Togglable>
                <List className="blog-list">
                  {blogs.map((blog) => (
                    <ListItem key={blog.id}>
                      <Typography component={Link} to={`/blogs/${blog.id}`}>{blog.title}</Typography>
                    </ListItem>
                  ))}
                </List>
              </div>
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <div>
              <Togglable buttonLabel="new blog">
                <BlogForm createBlog={addNewBlog} />
              </Togglable>
              <ul className="blog-list">
                {blogs.map((blog) => (
                  <li key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
        <Route
          path="/blogs/:blogId"
          element={
            <SingleBlogView
              updateLike={incrementLike}
              deleteBlog={deleteBlogById}
              addComment={addComment}
            />
          }
        />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:userId" element={<SingleUserView />} />
      </Routes>
    </Container>
  )
}

export default App
