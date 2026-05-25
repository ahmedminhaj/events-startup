// authApi.js
import { apiFetch } from './api';

export const loginUser = (body) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(body) });
export const registerUser = (body) => apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(body) });