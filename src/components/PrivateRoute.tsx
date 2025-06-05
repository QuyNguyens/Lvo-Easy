import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token');
  return !!token;
};

interface Props {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
