import { useNavigate } from 'react-router-dom'
import { useBooks } from '../../context/BooksContext'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminBookForm from '../../components/admin/AdminBookForm'
import './AddBook.css'

function AddBook() {
  const { addBook } = useBooks()
  const navigate = useNavigate()

  const handleSubmit = (bookData) => {
    addBook(bookData)
    navigate('/admin/dashboard')
  }

  const handleCancel = () => {
    navigate('/admin/dashboard')
  }

  return (
    <div className="admin-add-book">
      <AdminSidebar />
      <div className="admin-add-book-content">
        <div className="admin-add-book-header">
          <h1>Add New Book</h1>
          <p>Fill in the details to add a new book to the store</p>
        </div>
        <AdminBookForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  )
}

export default AddBook

