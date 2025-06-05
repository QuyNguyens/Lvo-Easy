import { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes/routes';

function AppRoutes() {
  const element = useRoutes(routes);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
