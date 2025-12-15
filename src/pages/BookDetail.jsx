import { useParams, Link, useNavigate } from 'react-router-dom'
import { useBooks } from '../context/BooksContext'
import FavoriteButton from '../components/FavoriteButton'
import './BookDetail.css'

function BookDetail() {
  const { id } = useParams()
  const { getBookById } = useBooks()
  const navigate = useNavigate()
  const book = getBookById(id)

  if (!book) {
    return (
      <div className="book-detail">
        <div className="book-detail-not-found">
          <h2>Book not found</h2>
          <p>The book you're looking for doesn't exist.</p>
          <Link to="/books" className="book-detail-back-link">
            Back to Books
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="book-detail">
      <button onClick={() => navigate(-1)} className="book-detail-back-button">
        ← Back
      </button>
      <div className="book-detail-container">
        <div className="book-detail-image">
          <img src={book.image} alt={book.title} />
        </div>
        <div className="book-detail-content">
          <div className="book-detail-header">
            <h1>{book.title}</h1>
            <FavoriteButton bookId={book.id} />
          </div>
          <p className="book-detail-author">by {book.author}</p>
          <p className="book-detail-price">{book.price.toFixed(2)} DT</p>
          <div className="book-detail-meta">
            <span className="book-detail-category">{book.category}</span>
            <span className="book-detail-isbn">ISBN: {book.isbn}</span>
          </div>
          <div className="book-detail-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
          <div className="book-detail-actions">
            <button className="book-detail-buy-button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetail

