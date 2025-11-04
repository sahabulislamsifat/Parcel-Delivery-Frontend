// src/components/RequireAuth.tsx
import React from "react";
import { useAppSelector } from "@/redux/hook";
import { Navigate } from "react-router-dom";

const RequireAuth: React.FC<{
  allowedRoles?: string[];
  children: React.ReactElement;
}> = ({ allowedRoles = [], children }) => {
  const auth = useAppSelector((s) => s.auth);

  // not logged in
  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  // role-based guard
  if (allowedRoles.length && !allowedRoles.includes(auth.user.role ?? "")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
