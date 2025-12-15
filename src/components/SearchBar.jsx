import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search books by title..."
        value={searchTerm}
        onChange={handleChange}
        className="search-bar-input"
      />
      {searchTerm && (
        <button onClick={handleClear} className="search-bar-clear">
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar

