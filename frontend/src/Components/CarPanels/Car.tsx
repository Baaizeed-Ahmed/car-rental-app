import React, { useEffect, useState } from "react";
import axios from "axios";
import { Car } from "../../models/car";
import "./Car.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Car[]>(
          "https://localhost:7039/api/Car"
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <Header />
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car.id} className="car-item">
            <img src={car.imageUrl} alt={car.name} className="car-image" />
            <div className="car-info">
              <Link to={`/car/${car.id}`} className="car-name-link">
                <p className="car-name">{car.name}</p>
              </Link>
              <p className="car-detail">Price Per Day: ${car.pricePerDay}</p>
              <p className="car-detail">
                Available This Week: {car.isAvailable ? "Yes" : "No"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
