import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
// Outlets allow parent route elements to render child routes.

function PrivateRoutes(props) {
  const navigate = useNavigate();
  console.log("Going through auth state change");
  let userAuth = false;
  onAuthStateChanged(props.authToken, (user) => {
    if (user) {
      console.log("shouldn't be reaching here?");
      // navigate("/");
      // return <Outlet />;
      userAuth = true;
    } else {
      console.log("should be reaching here?");
      navigate("/login");
      // return <Navigate to="/login" />;
    }
  });
  if (userAuth) {
    console.log("navigate to outlet");
    return <Navigate to="/" />;
  }
}

export default PrivateRoutes;
