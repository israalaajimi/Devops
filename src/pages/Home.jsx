import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>Welcome to Power Gym BookStore</h1>
        <p className="home-subtitle">
          Discover the best books on fitness, nutrition, and wellness
        </p>
        <Link to="/books" className="home-cta-button">
          Browse Books
        </Link>
      </div>
    </div>
  )
}

export default Home
