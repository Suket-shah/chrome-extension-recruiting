import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
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
            {/*<Route element={<PrivateRoutes authToken={firebaseAuth}/>} >*/}
              <Route path="/" element={<Home/>} />
              <Route path="/profile" element={<h1>Profile</h1>} />
              <Route path="/userPref" element={<h1>User Preferences</h1>} />
            {/*</Route>*/}
            <Route path="/login" element={<Login setAuthToken={setAuthToken}/>} />
            <Route path="/signup" element={<Signup setAuthToken={setAuthToken}/>} />
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;