import { useState, useEffect } from 'react'
import { useBooks } from '../../context/BooksContext'
import './AdminBookForm.css'

function AdminBookForm({ book = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    image: '',
    category: '',
    isbn: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        price: book.price || '',
        image: book.image || '',
        category: book.category || '',
        isbn: book.isbn || ''
      })
    }
  }, [book])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required'
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required'
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }
    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price)
      }
      onSubmit(bookData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-book-form">
      <div className="admin-book-form-row">
        <div className="admin-book-form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="admin-book-form-error">{errors.title}</span>}
        </div>

        <div className="admin-book-form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <span className="admin-book-form-error">{errors.author}</span>}
        </div>
      </div>

      <div className="admin-book-form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="admin-book-form-error">{errors.description}</span>}
      </div>

      <div className="admin-book-form-row">
        <div className="admin-book-form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={errors.price ? 'error' : ''}
          />
          {errors.price && <span className="admin-book-form-error">{errors.price}</span>}
        </div>

        <div className="admin-book-form-group">
          <label htmlFor="category">Category *</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
          />
          {errors.category && <span className="admin-book-form-error">{errors.category}</span>}
        </div>
      </div>

      <div className="admin-book-form-group">
        <label htmlFor="image">Image URL *</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={errors.image ? 'error' : ''}
        />
        {errors.image && <span className="admin-book-form-error">{errors.image}</span>}
        {formData.image && (
          <div className="admin-book-form-image-preview">
            <img src={formData.image} alt="Preview" />
          </div>
        )}
      </div>

      <div className="admin-book-form-group">
        <label htmlFor="isbn">ISBN *</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className={errors.isbn ? 'error' : ''}
        />
        {errors.isbn && <span className="admin-book-form-error">{errors.isbn}</span>}
      </div>

      <div className="admin-book-form-actions">
        <button type="submit" className="admin-book-form-submit">
          {book ? 'Update Book' : 'Add Book'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="admin-book-form-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default AdminBookForm

