import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Car } from '../../models/car';


const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Car[]>('https://localhost:7039/api/Car');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h2>Available Cars</h2>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            <img src={car.imageUrl} alt={car.name} style={{ width: "100px", height: "auto" }} />
            <div>Name: {car.name}</div>
            <div>Price Per Day: ${car.pricePerDay}</div>
            <div>Available This Week: {car.isAvailableThisWeek ? 'Yes' : 'No'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
