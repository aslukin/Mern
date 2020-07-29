import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';

import 'materialize-css';
import './App.css';
import { AuthContext } from './context/auth.context';
import { Navbar } from './components/Navbar';


function App() {

  const { tocken, login, logout, userId } = useAuth();
  const isAuthenticated = !!tocken;

  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value = {{
      tocken, login, logout, userId, isAuthenticated 
    }}>
      <Router>
        { isAuthenticated && <Navbar /> }
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
