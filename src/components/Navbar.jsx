import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  // Don't show navbar on admin login page
  if (location.pathname === '/admin/login') {
    return null
  }

  // Don't show navbar on admin pages (they have their own sidebar)
  if (isAdminRoute) {
    return null
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Power Gym BookStore
        </Link>
        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={`navbar-link ${location.pathname === '/books' ? 'active' : ''}`}
          >
            Books
          </Link>
          <Link
            to="/favorites"
            className={`navbar-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            Favorites
          </Link>
          <Link
            to="/admin/login"
            className="navbar-link navbar-link-admin"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

