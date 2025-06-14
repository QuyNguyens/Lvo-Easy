import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
