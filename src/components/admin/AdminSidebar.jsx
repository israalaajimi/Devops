import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AdminSidebar.css'

function AdminSidebar() {
  const location = useLocation()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Power Gym Admin</h2>
      </div>
      <nav className="admin-sidebar-nav">
        <Link
          to="/admin/dashboard"
          className={`admin-sidebar-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/add-book"
          className={`admin-sidebar-link ${isActive('/admin/add-book') ? 'active' : ''}`}
        >
          Add Book
        </Link>
        <Link
          to="/books"
          className="admin-sidebar-link"
        >
          View Store
        </Link>
      </nav>
      <div className="admin-sidebar-footer">
        <button onClick={handleLogout} className="admin-sidebar-logout">
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar

