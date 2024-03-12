import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import CarDetails from "./Components/CarDetails/CarDetails";
import CurrentRental from "./Components/CarDetails/CarReturn";
import CarList from "./Components/CarPanels/Car";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/SignUp";
import { UserProvider } from "./Components/Login/UserContext";

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/car/:carId" element={<CarDetails />} />
            <Route path="/current-rental/:carId" element={<CurrentRental />} />
            <Route path="/" element={<Navigate to="/cars" replace />} />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
