import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you'll add some custom styling
import logo from '../../Assets/Logo.png';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1><img src={logo} alt="Car Rental Company Logo" className="logo" /></h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/current-rental/:carId">View Rental</Link></li>
            <li><Link to="/login">Sign Out</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
