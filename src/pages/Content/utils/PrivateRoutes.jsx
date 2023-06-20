import React from 'react';
import { getAuth } from 'firebase/auth';
import { Outlet, Navigate } from 'react-router-dom';
// Outlets allow parent route elements to render child routes.

function PrivateRoutes(props) {
  if (props.authToken) {
    getAuth().verifyIdToken(props.authToken).then((user) => {
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
