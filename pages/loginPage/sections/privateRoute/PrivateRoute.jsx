import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (requireAdmin && user.role !== 'admin') {
      navigate('/unauthorized');
    }
  }, [user, navigate, requireAdmin]);

  if (!user || (requireAdmin && user.role !== 'admin')) {
    return null; // göstərə bilməz
  }

  return children;
};

export default ProtectedRoute;
