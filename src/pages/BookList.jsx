import { useState, useMemo } from 'react'
import { useBooks } from '../context/BooksContext'
import BookList from '../components/BookList'
import SearchBar from '../components/SearchBar'
import './BookListPage.css'

function BookListPage() {
  const { books } = useBooks()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter books based on search term
  const filteredBooks = useMemo(() => {
    if (!searchTerm.trim()) {
      return books
    }
    return books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [books, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <div className="book-list-page">
      <div className="book-list-page-header">
        <h1>Our Books</h1>
        <p>Browse our collection of fitness and wellness books</p>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="book-list-page-results">
        {searchTerm && (
          <p className="book-list-page-results-count">
            Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        )}
      </div>
      <BookList books={filteredBooks} />
    </div>
  )
}

export default BookListPage

