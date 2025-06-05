// src/routes/index.tsx
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Layout from '../components/Layout';

const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const WriteVocabPage = lazy(() => import('../pages/WriteVocabPage'));
const MyVocabPage = lazy(() => import('../pages/MyVocabPage'));
const SystemVocabPage = lazy(() => import('../pages/SystemVocabPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

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
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <WriteVocabPage /> },
      { path: 'write-vocab', element: <WriteVocabPage /> },
      { path: 'my-vocab', element: <MyVocabPage /> },
      { path: 'system-vocab', element: <SystemVocabPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
