import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAdmin = false, requirePhoneVerification = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (requireAdmin && user.role !== 'admin') {
      navigate('/unauthorized');
    } else if (requirePhoneVerification && !user.isPhoneVerified) {
      navigate('/verify-phone');
    }
  }, [user, navigate, requireAdmin, requirePhoneVerification]);

  if (
    !user ||
    (requireAdmin && user.role !== 'admin') ||
    (requirePhoneVerification && !user.isPhoneVerified)
  ) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
