// eventsApi.js
import { apiFetch } from './api';

export const getEvents = () => apiFetch('/api/events');
export const getEventById = (id) => apiFetch(`/api/events/${id}`);