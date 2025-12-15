import { Link } from 'react-router-dom'
import { useBooks } from '../../context/BooksContext'
import './AdminBookTable.css'

function AdminBookTable() {
  const { books, deleteBook } = useBooks()

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBook(id)
    }
  }

  if (books.length === 0) {
    return (
      <div className="admin-book-table-empty">
        <p>No books found. Add your first book!</p>
      </div>
    )
  }

  return (
    <div className="admin-book-table-container">
      <table className="admin-book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>
                <img
                  src={book.image}
                  alt={book.title}
                  className="admin-book-table-image"
                />
              </td>
              <td className="admin-book-table-title">{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <div className="admin-book-table-actions">
                  <Link
                    to={`/admin/edit-book/${book.id}`}
                    className="admin-book-table-edit"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id, book.title)}
                    className="admin-book-table-delete"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminBookTable

