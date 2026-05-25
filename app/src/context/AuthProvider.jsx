import { useState } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const persist = (response) => {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    setToken(response.accessToken);
    setUser(response.user);
  };

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    persist(response);
    return response.user;
  };

  const register = async (name, email, password) => {
    const response = await registerUser({ name, email, password });
    persist(response);
    return response.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;