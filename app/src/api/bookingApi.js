import { apiFetch } from './api';

/* Confirm booking — books all current cart items */
export const confirmBooking = () => apiFetch('/api/bookings', { method: 'POST' });

/* Fetch all bookings for the logged-in user */
export const getMyBookings = () => apiFetch('/api/bookings');