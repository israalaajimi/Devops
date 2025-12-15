import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Simple static admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem('powerGymAdminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Login function
  const login = (username, password) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true)
      localStorage.setItem('powerGymAdminAuth', 'true')
      return true
    }
    return false
  }

  // Logout function
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('powerGymAdminAuth')
  }

  const value = {
    isAuthenticated,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

