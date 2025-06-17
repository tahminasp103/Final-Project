import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/reducers/authSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(setCredentials({ token, user }));
    }

    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Yüklənir...</div>; // İstəyə görə Spinner və ya boş div ola bilər
  }

  return children;
};

export default AuthLoader;
