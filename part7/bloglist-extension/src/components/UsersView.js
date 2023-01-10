import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'

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
    <Container>
      <h2>Users</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Number of Blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user[1]}>
              <TableCell>
                <Typography component={Link} to={`/users/${user[1]}`}>
                  {user[0]}
                </Typography>
              </TableCell>
              <TableCell>{user[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}

export default UsersView
