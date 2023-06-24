import React from 'react';
import { onAuthStateChange } from 'firebase/auth';
import { Outlet, Navigate } from 'react-router-dom';
// Outlets allow parent route elements to render child routes.

function PrivateRoutes(props) {
  console.log("in PrivateRoutes", props.authToken);
  if (props.authToken) {
    getAuth().verifyIdToken(props.authToken).then((user) => {
      console.log("verifying auth token", user);
      if (user.isTokenValid) {
        return <Outlet />;
      } else {
        return <Navigate to="/login" />;
      }
    });
  }

  return <Navigate to="/login" />;
}

export default PrivateRoutes;
