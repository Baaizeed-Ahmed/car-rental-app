import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import HomePage from './Components/HomePage/HomePage';
 // Make sure this path is correct

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/home" element={<HomePage />} /> {/* Use element prop */}
            <Route path="/" element={<Login />} /> {/* Use element prop */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
