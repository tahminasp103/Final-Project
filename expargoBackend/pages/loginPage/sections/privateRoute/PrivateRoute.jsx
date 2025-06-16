import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, role, message }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // İstifadəçi login olmayıbsa
  if (!user) {
    // Optional: İstəyə görə mesaj göstərə bilərsiniz
    if (message) {
      alert(message);
    }
    return <Navigate to="/loginUser" state={{ from: location }} replace />;
  }

  // Rolu uyğun gəlmir
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
