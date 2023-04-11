import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

export default function ProtectedRoute() {
  const { isSignedIn, checkingAuthStatus } = useAuthStatus();
  if (checkingAuthStatus) {
    return <h1>Loading...</h1>;
  }
  return isSignedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
