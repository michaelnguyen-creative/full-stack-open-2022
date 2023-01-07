import { useParams } from 'react-router'
import { useSelector } from 'react-redux'

const SingleUserView = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const { userId } = useParams()
  const blogsByUser = blogs.filter((blog) => blog.user.userId === userId)
  return (
    <div>
      <h1>{blogsByUser[0].user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {blogsByUser.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}
export default SingleUserView