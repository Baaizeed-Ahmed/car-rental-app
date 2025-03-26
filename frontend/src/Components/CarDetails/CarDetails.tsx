import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Car } from '../../models/car';
import { UserContext } from '../Login/UserContext';

const CarDetails = () => {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const navigate = useNavigate();

  // Use the context
  const userContext = useContext(UserContext);
  
  // Make sure we have the user data
  if (!userContext) {
    throw new Error('UserContext is not available');
  }

  const { user } = userContext;

  useEffect(() => {
    fetch(`https://localhost:7039/api/Car/${carId}`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          navigate('/not-found');
        } else {
          setCar(data);
        }
      })
      .catch(error => {
        console.error('Fetching car details failed', error);
        navigate('/error');
      });
  }, [carId, navigate]);

  const rentCar = async () => {
    if (!user || !user.userId) {
      alert('You must be logged in to rent a car.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7039/api/rental/${user.userId}/${carId}`, { method: 'POST' });
      if (response.ok) {
        alert('Car rented successfully!');
        setCar(prevState => {
          return prevState ? { ...prevState, isAvailable: false } : prevState;
        });
      } else if (response.status === 400) {
        const errorMessage = await response.text();
        alert(errorMessage || 'You are already renting a car.');
      } else {
        throw new Error('Failed to rent car');
      }
    } catch (error) {
      // Type assertion to treat error as an instance of Error
      if (error instanceof Error) {
        console.error('Error renting car:', error);
        alert(error.message || 'Error renting car. Please try again.');
      } else {
        // Handle cases where the error is not an instance of Error
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <img src={car.imageUrl} alt={car.name} />
      <h1>{car.name}</h1>
      <p>Price: ${car.pricePerDay.toFixed(2)}</p>
      <p>Available This Week: {car.isAvailable ? 'Yes' : 'No'}</p>
      {car.isAvailable && <button onClick={rentCar}>Rent</button>}
      <button onClick={() => navigate('/cars')}>Back to Cars</button>
    </div>
  );
};

export default CarDetails;
