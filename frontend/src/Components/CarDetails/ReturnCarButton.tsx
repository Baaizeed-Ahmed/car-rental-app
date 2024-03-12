import React, { useState } from 'react';
import axios from 'axios';

interface ReturnCarButtonProps {
  userId: number;
  carId: number;
  onReturnSuccess: () => void;
  onError: (error: string) => void;
}

const ReturnCarButton: React.FC<ReturnCarButtonProps> = ({
  userId,
  carId,
  onReturnSuccess,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReturnCar = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://localhost:7039/api/Rental/Return/${userId}/${carId}`
      );
      if (response.status === 200) {
        onReturnSuccess();
      } else {
        onError(`Error: Unexpected response status code: ${response.status}`);
      }
    } catch (error) {
      // Handle error response with data
      let errorMessage = "An unexpected error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.detail || JSON.stringify(error.response.data, null, 2);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleReturnCar} disabled={isLoading}>
      {isLoading ? 'Returning...' : 'Return Car'}
    </button>
  );
};

export default ReturnCarButton;
