import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import './BookCard.css'

function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-card-image">
        <img 
          src={book.image} 
          alt={book.title} 
        />

        <FavoriteButton bookId={book.id} />
      </div>

      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">by {book.author}</p>
        <p className="book-card-price">{book.price.toFixed(2)} DT</p>
        <p className="book-card-category">{book.category}</p>

        <Link to={`/book/${book.id}`} className="book-card-link">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default BookCard




