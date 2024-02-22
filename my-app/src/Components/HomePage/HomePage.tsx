import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>You are logged in.</p>
      <Link to="/login">Log Out</Link>
    </div>
  );
};

export default HomePage;
