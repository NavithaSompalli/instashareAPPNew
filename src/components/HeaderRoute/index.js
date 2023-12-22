import {Link} from 'react-router-dom'

import './index.css'

import {FaSearch} from 'react-icons/fa'

const HeaderRoute = () => (
  <nav className="nav-container">
    <div>
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dqyqjbuku/image/upload/v1670935866/InstaShareIcon_lzrhwf.jpg"
          alt="website logo"
          className="nav-website-logo"
        />
      </Link>
      <span className="nav-tag-line">Insta Share</span>
    </div>
    <ul className="ul-container">
      <li className="list-item">
        <input
          type="search"
          className="search-element"
          placeholder="Search Caption"
        />
        <FaSearch />
      </li>
      <Link to="/">
        <li className="list-item-home">Home</li>
      </Link>

      <li className="list-item-profile">Profile</li>
      <li className="logout-element">
        <Link to="/login">
          {' '}
          <button type="button" className="logout-button">
            Logout
          </button>
        </Link>
      </li>
    </ul>
  </nav>
)

export default HeaderRoute
