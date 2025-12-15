import { useBooks } from '../context/BooksContext'
import BookList from '../components/BookList'
import './Favorites.css'

function Favorites() {
  const { getFavoriteBooks } = useBooks()
  const favoriteBooks = getFavoriteBooks()

  return (
    <div className="favorites-page">
      <div className="favorites-page-header">
        <h1>My Favorites</h1>
        <p>
          {favoriteBooks.length === 0
            ? "You haven't added any favorites yet."
            : `You have ${favoriteBooks.length} favorite book${favoriteBooks.length !== 1 ? 's' : ''}.`}
        </p>
      </div>
      {favoriteBooks.length > 0 ? (
        <BookList books={favoriteBooks} />
      ) : (
        <div className="favorites-empty">
          <p>Start adding books to your favorites to see them here!</p>
        </div>
      )}
    </div>
  )
}

export default Favorites

