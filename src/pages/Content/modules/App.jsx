import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
import UserPreference from "../pages/UserPreference.jsx";
import { auth as firebaseAuth } from "../utils/firebase.jsx";

import Banner from './Banner.jsx';
import PrivateRoutes from '../utils/PrivateRoutes.jsx';
import './App.css';

const App = () => {
  const [authToken, setAuthToken] = React.useState(localStorage.getItem("recruitPlusAuthToken"));



  return (
    <div className="app-frame">
      <Banner />
      <Router>
        <section>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/userPref" element={<UserPreference />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;