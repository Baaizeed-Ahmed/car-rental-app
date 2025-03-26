import React from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';



jest.mock('axios');

describe('Login component', () => {
  it('displays error message when form is submitted with empty fields', async () => {
    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Username is required.')).toBeInTheDocument();
      expect(screen.getByText('Password is required.')).toBeInTheDocument();
    });
  });

  it('displays error message when login fails', async () => {
    const errorMessage = 'Invalid login credentials.';
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('navigates to /cars on successful login', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({ data: { userId: 123 } });

    const { getByLabelText, getByText } = render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(getByLabelText('Username:'), { target: { value: 'testuser' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'testpassword' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(window.location.pathname).toBe('/cars');
    });
  });
});
