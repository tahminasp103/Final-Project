import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  // Səhifənin haradan çağırıldığına bax
  const isFromRegister = location.pathname === '/signup';

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (isFromRegister && !user.isPhoneVerified) {
      navigate('/verify-phone'); // Telefon doğrulama səhifəsinə yönləndir
    }
  }, [user, navigate, isFromRegister]);

  if (!user) return null;
  if (isFromRegister && !user.isPhoneVerified) return null;

  return children;
};

export default ProtectedRoute;
