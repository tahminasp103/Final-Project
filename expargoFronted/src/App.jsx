import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Router from './router/Router'
import { useDispatch } from 'react-redux'
import { setCredentials } from './redux/reducers/AuthSlice'

function App() {
  const [count, setCount] = useState(0)
  const dispatch =useDispatch()
useEffect(() => {
  const token = localStorage.getItem('token');
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && token) {
      dispatch(setCredentials({ user, token }));
    }
  } catch (error) {
    console.error("User parsing error", error);
  }
}, [dispatch]);
  return (
    <>
      <Router/>
    </>
  )
}

export default App
