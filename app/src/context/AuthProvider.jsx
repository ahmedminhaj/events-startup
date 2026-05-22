import {
  createContext,
  useState,
} from 'react';

import {
  loginUser,
  registerUser,
} from '../api/authApi';

export const AuthContext = createContext(null);

const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(() => {
      const stored =
        localStorage.getItem(
          'user'
        );

      return stored
        ? JSON.parse(stored)
        : null;
    });

  const [token, setToken] =
    useState(() => {
      return (
        localStorage.getItem(
          'token'
        ) || null
      );
    });

  /*
    LOGIN
  */

  const login = async (
    email,
    password
  ) => {
    const response = await loginUser({ email, password,});

    persist(response);

    return response.user;
  };

  /*
    REGISTER
  */

  const register = async (
    name,
    email,
    password
  ) => {
    const response = await registerUser({
        name,
        email,
        password,
    });

    persist(response);

    return response.user;
  };

  /*
    LOGOUT
  */

  const logout = () => {
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'user' );

    setUser(null);
    setToken(null);
  };

  /*
    SAVE SESSION
  */

  const persist = ( response ) => {
    localStorage.setItem( 'token', response.accessToken);
    localStorage.setItem( 'user', JSON.stringify(response.user));

    setToken(response.accessToken);
    setUser(response.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated:
          !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;