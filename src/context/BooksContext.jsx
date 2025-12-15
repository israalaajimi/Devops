import { createContext, useContext, useState, useEffect } from 'react'
import guideImage from '../assets/guidecomple.png';

const BooksContext = createContext()

// Initial book data
const initialBooks = [
  {
    id: 1,
    title: 'The Complete Guide to Fitness',
    author: 'John Smith',
    description: 'A comprehensive guide to building strength and endurance.',
    price: 29.99,
    image: "/guide-fitness.jpg",
    category: 'Fitness',
    isbn: '978-1234567890'
  },
  {
    id: 2,
    title: 'Nutrition for Athletes',
    author: 'Sarah Johnson',
    description: 'Learn the best nutrition strategies for peak performance.',
    price: 24.99,
    image: "/sports-nutrition-guide.jpg",
    category: 'Nutrition',
    isbn: '978-1234567891'
  },
  {
    id: 3,
    title: 'Yoga Mastery',
    author: 'Emily Davis',
    description: 'Master the art of yoga for flexibility and mindfulness.',
    price: 19.99,
     image: "/yoga.jpg",
    category: 'Wellness',
    isbn: '978-1234567892'
  },
  {
    id: 4,
    title: 'Strength Training Basics',
    author: 'Mike Wilson',
    description: 'Essential techniques for building muscle and strength.',
    price: 27.99,
    image: "/basics.jpg",
    category: 'Fitness',
    isbn: '978-1234567893'
  },
  {
    id: 5,
    title: 'Cardio Workouts',
    author: 'Lisa Anderson',
    description: 'Effective cardio routines for heart health and endurance.',
    price: 22.99,
     image: "/cardio.jpg",
    category: 'Fitness',
    isbn: '978-1234567894'
  }
]

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([])
  const [favorites, setFavorites] = useState([])

  // Load books from localStorage on mount
  useEffect(() => {
    const storedBooks = localStorage.getItem('powerGymBooks')
    const storedFavorites = localStorage.getItem('powerGymFavorites')

    if (storedBooks) {
      setBooks(JSON.parse(storedBooks))
    } else {
      // Initialize with default books
      setBooks(initialBooks)
      localStorage.setItem('powerGymBooks', JSON.stringify(initialBooks))
    }

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Save books to localStorage whenever books change
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('powerGymBooks', JSON.stringify(books))
    }
  }, [books])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('powerGymFavorites', JSON.stringify(favorites))
  }, [favorites])

  // Add a new book
  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now() // Simple ID generation
    }
    const updatedBooks = [...books, newBook]
    setBooks(updatedBooks)
    return newBook
  }

  // Update an existing book
  const updateBook = (id, updatedBook) => {
    const updatedBooks = books.map(book =>
      book.id === id ? { ...updatedBook, id } : book
    )
    setBooks(updatedBooks)
  }

  // Delete a book
  const deleteBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id)
    setBooks(updatedBooks)
    // Also remove from favorites if it was favorited
    const updatedFavorites = favorites.filter(bookId => bookId !== id)
    setFavorites(updatedFavorites)
  }

  // Get a single book by ID
  const getBookById = (id) => {
    return books.find(book => book.id === parseInt(id))
  }

  // Toggle favorite status
  const toggleFavorite = (bookId) => {
    setFavorites(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId)
      } else {
        return [...prev, bookId]
      }
    })
  }

  // Check if a book is favorited
  const isFavorite = (bookId) => {
    return favorites.includes(bookId)
  }

  // Get favorite books
  const getFavoriteBooks = () => {
    return books.filter(book => favorites.includes(book.id))
  }

  const value = {
    books,
    favorites,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    toggleFavorite,
    isFavorite,
    getFavoriteBooks
  }

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  )
}

export const useBooks = () => {
  const context = useContext(BooksContext)
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider')
  }
  return context
}

