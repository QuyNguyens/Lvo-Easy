// src/routes/index.tsx
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Layout from '../components/Layout';
import MyVocabLayout from '../components/MyVocabLayout';
import AuthSuccess from '../pages/AuthSuccess';

const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const WriteVocabPage = lazy(() => import('../pages/WriteVocabPage'));
const MyVocabPage = lazy(() => import('../pages/MyVocabPage'));

const TopicPracticePage = lazy(() => import('../pages/TopicPracticePage'));
const TopicRememberPage = lazy(() => import('../pages/TopicRememberPage'));
const SystemVocabPage = lazy(() => import('../pages/SystemVocabPage'));
const TopicLearnPage = lazy(() => import('../pages/TopicLearnPage'));
const TopicLearnQuestionPage = lazy(() => import('../pages/TopicLearnQuestionPage'));
const TopicLearnInputPage = lazy(() => import('../pages/TopicLearnInputPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));

const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ServerWakingPage = lazy(() => import('../pages/ServerWakingPage'));

const routes: RouteObject[] = [
  {
    path: '/wait',
    element: <PublicRoute><ServerWakingPage /></PublicRoute>,
  },
  {
    path: '/login',
    element: <PublicRoute><LoginPage /></PublicRoute>,
  },
  {
    path: '/signup',
    element: <PublicRoute><SignUpPage /></PublicRoute>,
  },
  {
    path: '/auth-success',
    element: <PublicRoute><AuthSuccess/></PublicRoute>
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
      { path: 'write-vocab',element: <WriteVocabPage /> },
      { 
        path: 'my-vocab',
        element: <MyVocabLayout/>,
        children: [
          { index: true, element: <MyVocabPage /> },
          { path: 'practice', element: <TopicPracticePage/> },
          { path: 'remember', element: <TopicRememberPage/>},
        ]
      },
      {
        path: 'system-vocab',
        element: <MyVocabLayout /> ,
        children: [
          { index: true, element: <SystemVocabPage /> },
          { path: 'learn', element: <TopicLearnPage/> },
          { path: 'learn-question', element: <TopicLearnQuestionPage/>},
          { path: 'learn-input', element: <TopicLearnInputPage/>},
          { path: 'practice', element: <TopicPracticePage/> },
          { path: 'remember', element: <TopicRememberPage/>},
        ]
      },
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
