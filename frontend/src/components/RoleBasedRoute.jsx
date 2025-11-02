// components/RoleBasedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";

export const RoleBasedRoute = ({ children, role }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
