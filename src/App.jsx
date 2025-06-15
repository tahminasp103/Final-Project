import { useEffect } from 'react';
import './App.css';
import Router from './router/Router';
import { useDispatch } from 'react-redux';
import { clearUser, setCredentials } from './redux/reducers/authSlice';
import axios from 'axios';


function App() {
    const dispatch = useDispatch();
 useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      // Axios başlıqlarına əlavə et
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Redux store-a yüklə
      dispatch(setCredentials({ token, user: JSON.parse(user) }));
    }
  }, [dispatch]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
