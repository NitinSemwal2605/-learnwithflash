import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    const password = prompt('Please enter the admin password:');
    if (password === 'Sexyboi') { 
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  if (!isAuthenticated) {
    handleAuthentication();
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
