import { useQuery } from '@apollo/client'
import { WHOAMI } from '../queries'
import { BookList } from './Books'

const Recommendation = ({ show, books }) => {
  const whoAmI = useQuery(WHOAMI)

  if (!show) return null

  if (books.loading) return 'Getting books...'
  if (whoAmI.loading) return 'Loading me...'

  const myFavBooks = books.filter((b) => b.genres.includes(whoAmI.data.me.favGenre))

  return (
    <div>
      <h1>recommendations</h1>
      <p>
        books in your favorite genre{' '}
        <span style={{ fontWeight: 'bold' }}>{whoAmI.data.me.favGenre}</span>
      </p>
      <BookList booksToShow={myFavBooks}/>
    </div>
  )
}

export default Recommendation
