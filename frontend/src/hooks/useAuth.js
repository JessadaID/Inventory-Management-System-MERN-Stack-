// hooks/useAuth.js
import { useContext } from 'react';
import  UserContext  from '../context/userContext';

export const useAuth = () => {
  const { user } = useContext(UserContext);

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    hasRole,
    hasAnyRole,
    hasPermission,
    isAdmin,
    isAuthenticated
  };
};