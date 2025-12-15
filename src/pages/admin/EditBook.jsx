import { useParams, useNavigate } from 'react-router-dom'
import { useBooks } from '../../context/BooksContext'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminBookForm from '../../components/admin/AdminBookForm'
import './EditBook.css'

function EditBook() {
  const { id } = useParams()
  const { getBookById, updateBook } = useBooks()
  const navigate = useNavigate()
  const book = getBookById(id)

  if (!book) {
    return (
      <div className="admin-edit-book">
        <AdminSidebar />
        <div className="admin-edit-book-content">
          <div className="admin-edit-book-not-found">
            <h2>Book not found</h2>
            <p>The book you're trying to edit doesn't exist.</p>
            <button onClick={() => navigate('/admin/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = (bookData) => {
    updateBook(book.id, bookData)
    navigate('/admin/dashboard')
  }

  const handleCancel = () => {
    navigate('/admin/dashboard')
  }

  return (
    <div className="admin-edit-book">
      <AdminSidebar />
      <div className="admin-edit-book-content">
        <div className="admin-edit-book-header">
          <h1>Edit Book</h1>
          <p>Update the book information</p>
        </div>
        <AdminBookForm book={book} onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}

export default EditBook

