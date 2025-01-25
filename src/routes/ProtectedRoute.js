import React from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return (
      <>
        <ToastContainer />
        <Navigate to="/login" replace />
      </>
    );
  }
  return children;
}

export default ProtectedRoute;
