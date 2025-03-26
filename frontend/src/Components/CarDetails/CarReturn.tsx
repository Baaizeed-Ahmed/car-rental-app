import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Login/UserContext";
import ReturnCarButton from "./ReturnCarButton";

export interface Car {
  id: number;
  carName: string;
  carImageUrl: string;
  carPricePerDay: number;
  carIsAvailable: boolean;
}

const CurrentRental: React.FC = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const userId = userContext?.user?.userId;
  const [car, setCar] = useState<Car | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!userId) {
      setErrorMessage("You must be logged in to view rentals.");
      return;
    }
    fetch(`https://localhost:7039/api/Rental/Current/${userId}`)
      .then((response) => {
        if (!response.ok) {
          // Instead of throwing an error, set an error message state variable
          setErrorMessage("No active rental found. Please rent a car first.");
          return null; // Prevent further processing
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCar(data);
          setErrorMessage(""); // Clear any previous error messages
        }
      })
      .catch((error) => {
        console.error("Error fetching current rental:", error);
        // You can optionally handle API call errors more specifically here
        setErrorMessage("An error occurred while fetching your rental.");
      });
  }, [userId, navigate]);

  const handleReturnSuccess = () => {
    alert("Car returned successfully.");
    navigate('/cars'); // Navigates to the list of cars after a successful return
  };

  const handleError = (error: string) => {
    alert(`Error returning car: ${error}`);
  };

  if (errorMessage) {
    // Display the error message as a notification at the top
    return (
      <div>
        <p>{errorMessage}</p>
        <button onClick={() => navigate('/cars')}>Back to Cars</button>
      </div>
    );
  }

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <img src={car.carImageUrl} alt={car.carName} />
      <h2>{car.carName}</h2>
      <p>Price per day: ${car.carPricePerDay}</p>
      {!car.carIsAvailable && (
        <ReturnCarButton
          userId={Number(userId)}
          carId={car.id}
          onReturnSuccess={handleReturnSuccess}
          onError={handleError}
        />
      )}
      <button onClick={() => navigate('/cars')}>Back to Cars</button>
    </div>
  );
};

export default CurrentRental;
