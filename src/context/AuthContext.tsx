import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { AuthContext } from './AuthContextDef';

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await authAPI.getProfile();
          if (isMounted) {
            setUser({
              id: userData._id,
              username: userData.username,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
            });
          }
        } catch {
          // Token is invalid
          localStorage.removeItem('token');
          if (isMounted) {
            setToken(null);
          }
        }
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };
    
    loadUser();
    
    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async (username: string, password: string) => {
    const response = await authAPI.login({ username, password });
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const register = async (userData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    const response = await authAPI.register(userData);
    localStorage.setItem('token', response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
