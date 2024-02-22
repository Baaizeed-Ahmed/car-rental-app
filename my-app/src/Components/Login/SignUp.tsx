import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // State for username
  const [email, setEmail] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for password
  const [error, setError] = useState<string>(""); // State for storing any error messages
  const navigate = useNavigate(); // Hook for navigating to different routes

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Reset error message

    try {
      // Perform the signup request to your API endpoint
      const response = await axios.post(
        "https://localhost:7039/api/Auth/register",
        { Username: username, Email: email, Password: password }, // Include email in the payload
        {
          headers: {
            'Content-Type': 'application/json', // Ensure the correct content type for JSON
          },
        }
      );

      console.log("Signup successful:", response.data);
      navigate("/login"); // Navigate to the login page on successful signup
    } catch (err) {
      // Handle any errors that occur during signup
      if (axios.isAxiosError(err) && err.response) {
        // If the error is from the API, use the API's error message
        setError(err.response.data?.message || "Failed to sign up.");
      } else {
        // For other errors, such as network issues, display a generic error message
        setError("Failed to sign up due to a network or server issue.");
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email" // Use email type for basic email validation
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on change
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
