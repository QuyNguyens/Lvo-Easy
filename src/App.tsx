import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, useRoutes } from 'react-router-dom';
import routes from './routes/routes';
import { AuthProvider, createAuthValue } from './context/UserContext';
import "./i18n";
import { createSettingsValue, SettingsProvider } from './context/SettingsContext';

function AppRoutes() {
  const element = useRoutes(routes);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

function App() {
   const auth = createAuthValue();
   const settings = createSettingsValue();
   const navigate = useNavigate();

   const checkConnected = async () =>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/wake`);
    if(res){
      navigate('/');
    }
    navigate('/wake');
   }

   useEffect(() =>{
    document.documentElement.classList.remove("light", "dark");
    const theme = localStorage.getItem('theme');
    if (theme ) {
      document.documentElement.classList.add(theme);
    }
    // checkConnected();
   },[]);

  return (
    <SettingsProvider value={settings}>
      <AuthProvider value={auth}>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
