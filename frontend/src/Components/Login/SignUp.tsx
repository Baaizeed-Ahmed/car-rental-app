import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); 

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7039/api/Auth/register",
        { Username: username, Email: email, Password: password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Failed to sign up.");
      } else {
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
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={() => navigate("/login")}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
