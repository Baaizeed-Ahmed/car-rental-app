import React, { useState, FormEvent, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required.");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return false;
    }
    return true; // Validation passed
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!validateForm()) {
      return; // Stop the form submission if validation fails
    }

    try {
      const response = await axios.post(
        'https://localhost:7039/api/Auth/login',
        { Username: username, Password: password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Login successful:', response.data);
      userContext?.setUser({ userId: response.data.userId });
      navigate('/cars'); // Redirect to home page upon successful login
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        // Check if the API returned a specific error message and display it
        setError(err.response.data?.message || 'Failed to login. Please check your credentials.');
      } else {
        setError('Failed to login due to a network or server issue.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
