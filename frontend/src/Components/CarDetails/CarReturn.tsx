import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Login/UserContext";
import ReturnCarButton from "./ReturnCarButton"; // Ensure this import is correct

export interface Car {
  id: number;
  carName: string;
  carImageUrl: string;
  carPricePerDay: number;
  carIsAvailable: boolean;
}

const CurrentRental: React.FC = () => {
  const { carId } = useParams<{ carId: string }>(); // Destructuring carId from the URL
  const numericCarId = Number(carId); // Converting carId to a number
  const [car, setCar] = useState<Car | null>(null);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const userId = userContext?.user?.userId;

  useEffect(() => {
    if (!userId) {
      alert("You must be logged in to view rentals.");
      navigate("/login");
      return;
    }
    fetch(`https://localhost:7039/api/Rental/Current/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Rental not found or error fetching rental");
        }
        return response.json();
      })
      .then((data) => {
        setCar(data); // Ensure that 'id' property is present in the fetched data
      })
      .catch((error) => {
        console.error("Error fetching current rental:", error);
        navigate("/error");
      });
  }, [userId, navigate]);

  const handleReturnSuccess = () => {
    alert("Car returned successfully.");
    navigate("/cars");
  };

  const handleError = (error: string) => {
    alert(`Error returning car: ${error}`);
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <img src={car.carImageUrl} alt={car.carName} />
      <h2>{car.carName}</h2>
      <p>Price per day: ${car.carPricePerDay}</p>
      {!car.carIsAvailable && (
        <ReturnCarButton
          userId={Number(userId)}
          carId={numericCarId}
          onReturnSuccess={handleReturnSuccess}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default CurrentRental;
