import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {Helmet} from 'react-helmet';

import AppNavbar from './Components/AppNavbar';
import AllGames from './Components/AllGames';
import RegisterPage from './Components/profile/RegisterPage';
import LoginPage from './Components/profile/Login';
import Profile from './Components/profile/Profile';

import { loadUser } from './state/action-creators/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { store } from './state/store';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <div className="App">
      <Helmet>
        <title>MyGamingList</title>
      </Helmet>
      <AppNavbar />
      <Routes>
        <Route exact path="/" element={<AllGames />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
