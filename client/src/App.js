import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import { useAuth } from './hooks/auth.hook.';
import './App.scss';
import { AuthContext } from './context/AuthContext';
import Loader from './components/loader/Loader';



function App() {
  const {token, login, logout, userId,ready} =useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
   

  if (!ready) {
    return <Loader />
  }

  return ( 
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
     
    <Router> 
      {isAuthenticated }
       {routes}
    </Router>
   
  </AuthContext.Provider>
  );
}

export default App;
