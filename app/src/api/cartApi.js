// cartApi.js
import { apiFetch } from './api';

export const getCartItems = () => apiFetch('/api/cart');
export const addToCart = (eventId) => apiFetch('/api/cart', { method: 'POST', body: JSON.stringify({ eventId }) });
export const removeFromCart = (eventId) => apiFetch(`/api/cart/${eventId}`, { method: 'DELETE' });