import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(false); // Set loading to false immediately to allow rendering
      
      try {
        const response = await fetch('/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
          setHasSubscription(userData.subscription_status !== null);
        } else {
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        // Don't block rendering on auth failure
      }
    };

    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setHasSubscription(userData.subscription_status !== null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setHasSubscription(false);
  };

  const updateSubscriptionStatus = (status) => {
    setHasSubscription(status !== null);
    if (user) {
      const updatedUser = { ...user, subscription_status: status };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider 
      value={{
        isAuthenticated,
        isLoading,
        hasSubscription,
        user,
        login,
        logout,
        updateSubscriptionStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
