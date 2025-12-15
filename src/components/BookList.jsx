import { useBooks } from '../context/BooksContext'
import BookCard from './BookCard'
import './BookList.css'

function BookList({ books }) {
  if (!books || books.length === 0) {
    return (
      <div className="book-list-empty">
        <p>No books found.</p>
      </div>
    )
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookList

