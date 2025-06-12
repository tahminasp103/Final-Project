import { useEffect } from 'react';
import './App.css';
import Router from './router/Router';
import { useDispatch } from 'react-redux';
import { clearUser, setCredentials } from './redux/reducers/authSlice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:7777/api/users/profile', { withCredentials: true });
        dispatch(setCredentials({ user: data, token: null }));
      } catch (error) {
        logout(); // Giriş uğursuz olduqda logout çağırılır
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
