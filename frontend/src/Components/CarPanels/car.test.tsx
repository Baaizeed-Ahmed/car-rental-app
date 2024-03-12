import React from 'react';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter as Router } from 'react-router-dom';
import CarList from './Car';

// Mock data that matches the structure of the data returned by your API
const mockCars = [
  { id: '1', name: 'Car One', pricePerDay: 100, imageUrl: 'https://example.com/car1.jpg', isAvailable: true },
  { id: '2', name: 'Car Two', pricePerDay: 150, imageUrl: 'https://example.com/car2.jpg', isAvailable: false },
];

// Mocking axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CarList Component', () => {
  it('fetches and displays cars', async () => {
    // Setup axios mock to resolve with mockCars data
    mockedAxios.get.mockResolvedValue({ data: mockCars });

    render(
      <Router>
        <CarList />
      </Router>
    );

    // Assert that the cars are eventually displayed
    for (const car of mockCars) {
      await waitFor(() => expect(screen.getByText(car.name)).toBeInTheDocument());
      expect(screen.getByAltText(car.name)).toHaveAttribute('src', car.imageUrl);
      expect(screen.getByText(`Price Per Day: $${car.pricePerDay}`)).toBeInTheDocument();
      const availabilityText = car.isAvailable ? "Yes" : "No";
      expect(screen.getByText(`Available This Week: ${availabilityText}`)).toBeInTheDocument();
    }
  });
});
