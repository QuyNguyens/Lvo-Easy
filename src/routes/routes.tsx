import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <PublicRoute><LoginPage /></PublicRoute>,
  },
  {
    path: '/signup',
    element: <PublicRoute><SignUpPage /></PublicRoute>,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
