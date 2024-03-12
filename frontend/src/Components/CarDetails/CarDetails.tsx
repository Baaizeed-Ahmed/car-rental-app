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

  const { user, setUser } = userContext;

  useEffect(() => {
    fetch(`https://localhost:7039/api/Car/${carId}`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          navigate('/not-found'); // Navigate to a not-found page if the car doesn't exist
        } else {
          setCar(data);
        }
      })
      .catch(error => {
        console.error('Fetching car details failed', error);
        navigate('/error'); // Navigate to an error page on fetch failure
      });
  }, [carId, navigate]);

  const rentCar = async () => {
    // Check if the user is logged in
    if (!user || !user.userId) {
      alert('You must be logged in to rent a car.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7039/api/rental/${user.userId}/${carId}`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to rent car');
      }
      alert('Car rented successfully!');
      setCar(prevState => {
        if (prevState) {
          return { ...prevState, isAvailable: false };
        }
        return prevState;
      });
    } catch (error) {
      console.error('Error renting car:', error);
      alert('Error renting car. Please try again.');
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
    </div>
  );
};

export default CarDetails;
