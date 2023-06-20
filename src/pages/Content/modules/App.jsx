import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

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
            <Route element={<PrivateRoutes />} authToken={authToken}>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/profile" element={<h1>Profile</h1>} />
              <Route path="/userPref" element={<h1>User Preferences</h1>} />
            </Route>
            <Route path="/login" element={<h1>Login</h1> } setAuthToken={setAuthToken}/>
            <Route path="/signup" element={<h1>Signup</h1>} setAuthToken={setAuthToken}/>
          </Routes>
        </section>
      </Router>
    </div>
  );
}

export default App;