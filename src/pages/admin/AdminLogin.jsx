import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AdminLogin.css'

function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (login(username, password)) {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <h1>Admin Login</h1>
        <p className="admin-login-subtitle">Power Gym BookStore Admin Panel</p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}
          <div className="admin-login-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="admin-login-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>
        <div className="admin-login-info">
          <p>Demo Credentials:</p>
          <p>Username: <strong>admin</strong></p>
          <p>Password: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

