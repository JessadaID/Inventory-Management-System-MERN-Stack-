// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import   UserContext from '../context/userContext';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  // รอโหลดข้อมูล user
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  // ไม่ได้ login -> redirect ไป login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ถ้ากำหนด allowedRoles และ user ไม่มีสิทธิ์
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ผ่านทุกเงื่อนไข
  return children;
};