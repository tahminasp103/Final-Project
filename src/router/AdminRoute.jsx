import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.admin.user);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" />;
  }
  

  return children;
};

export default AdminRoute;
