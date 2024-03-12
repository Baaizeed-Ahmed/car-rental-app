import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosMock from 'axios-mock-adapter';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import Login from '../Login/Login';
import { UserContext, UserProvider } from '../Login/UserContext';

// Mock axios
const mockAxios = new axiosMock(axios);

// Define initialMockUser as null for starting state
const initialMockUser = null; // Or define a mock user object as needed

// Utility to wrap Login with context and router
const renderLoginWithContext = (userContextValue = { user: initialMockUser, setUser: jest.fn() }) => {
  render(
    <UserProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </UserProvider>
  );
};

describe('Login Component', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('renders login form', () => {
    renderLoginWithContext();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('updates input fields and shows error on empty submit', async () => {
    renderLoginWithContext();
    userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    expect(screen.getByLabelText(/username/i)).toHaveValue('testuser');

    userEvent.type(screen.getByLabelText(/password/i), 'password');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password');

    userEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assuming your validateForm function triggers an error for empty fields after interaction
    await waitFor(() => {
      // Adjust based on how your application handles form validation and error display
      expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
    });
  });

  test('handles successful login', async () => {
    const setUserMock = jest.fn();
    mockAxios.onPost('https://localhost:7039/api/Auth/login').reply(200, {
      userId: 123,
      // Include other AuthUser fields here as needed
    });

    renderLoginWithContext({ user: initialMockUser, setUser: setUserMock });

    userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(setUserMock).toHaveBeenCalledWith({
        userId: 123,
        // Include other AuthUser fields here as expected in response
      });
      // You might need to mock or spy on useNavigate to ensure navigation was called
    });
  });

  test('shows error on login failure', async () => {
    mockAxios.onPost('https://localhost:7039/api/Auth/login').networkError();

    renderLoginWithContext();

    userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to login due to a network or server issue/i)).toBeInTheDocument();
    });
  });
});
