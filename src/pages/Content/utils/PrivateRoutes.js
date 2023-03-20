import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// Outlets allow parent route elements to render child routes.

function PrivateRoutes(props) {
    console.log("PrivateRoutes is being rendered");
    return  localStorage.getItem("recruitPlusAuthToken") ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;