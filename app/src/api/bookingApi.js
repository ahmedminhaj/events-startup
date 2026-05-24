const API_BASE_URL = 'http://localhost:3001/api/bookings';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

/* Confirm booking — books all current cart items */
export const confirmBooking = async () => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to confirm booking');
  }

  return response.json();
};

/* Fetch all bookings for the logged-in user */
export const getMyBookings = async () => {
  const response = await fetch(API_BASE_URL, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch bookings');
  }

  return response.json();
};