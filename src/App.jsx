import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BooksProvider } from './context/BooksContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// User Interface Pages
import Home from './pages/Home'
import BookListPage from './pages/BookList'
import BookDetail from './pages/BookDetail'
import Favorites from './pages/Favorites'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddBook from './pages/admin/AddBook'
import EditBook from './pages/admin/EditBook'

import './App.css'

function App() {
  return (
    <BooksProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="app-main">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookListPage />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/favorites" element={<Favorites />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add-book"
                  element={
                    <ProtectedRoute>
                      <AddBook />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/edit-book/:id"
                  element={
                    <ProtectedRoute>
                      <EditBook />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </BooksProvider>
  )
}

export default App
