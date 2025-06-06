import { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes/routes';
import { AuthProvider, createAuthValue } from './context/UserContext';
import "./i18n";

function AppRoutes() {
  const element = useRoutes(routes);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

function App() {
   const auth = createAuthValue();

  return (
    <AuthProvider value={auth}>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
