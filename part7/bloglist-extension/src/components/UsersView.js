import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersView = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  const usersWithBlogCounts = blogs.reduce((acc, { user }) => {
    const currCount = acc[[user.name, user.userId]]
      ? acc[[user.name, user.userId]]
      : 0
    return { ...acc, [[user.name, user.userId]]: currCount + 1 }
  }, {})

  const usersArrayFromObj = Object.entries(usersWithBlogCounts)
  const users = usersArrayFromObj.map((user) => [
    ...user[0].split(','),
    user[1],
  ])

  return (
    <>
      <div>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user[1]}>
                <td>
                  <Link to={`/users/${user[1]}`}>{user[0]}</Link>
                </td>
                <td>{user[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UsersView
