import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/reducers/authSlice';

import Home from '../pages/home/Home';
import LoginPage from '../pages/loginPage/LoginPage';
import Registration from '../pages/loginPage/sections/registration/Registration';
import Admin from '../pages/admin/Admin';
import DashboardHome from '../pages/dashboardHome/DashboardHome';
import UniversalRoute from '../pages/loginPage/sections/privateRoute/PrivateRoute';
import LoginUser from '../pages/loginPage/sections/loginUser/LoginUser';
import AdminPanel from '../components/cards/adminPanel/AdminPanel';
import AdminRoute from './UniversalRoute';
import AdminLogin from '../pages/adminLogin/AdminLogin';
import ProfilePage from '../pages/loginPage/sections/profilePage/ProfilePage';
import Rates from '../pages/home/sections/rates/Rates';
import Order from '../pages/dashboardHome/order/Order';
import StripeWrapper from '../pages/dashboardHome/payment/StripeWrapper';
import ProtectedRoute from '../pages/loginPage/sections/privateRoute/PrivateRoute';
import AuthLoader from '../components/authLoader/AuthLoader';
import Logout from '../pages/loginPage/sections/logout/Logout';
import Faq from '../pages/faq/Faq';
import Commercial from '../pages/commercial/Commercial';
const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      console.log("localStorage-dən gələn user:", user); // Debug üçün
      dispatch(setCredentials({ token, user }));
    }
  }, [dispatch]);


  return (
    <BrowserRouter>
    <AuthLoader>
 <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/loginUser" element={<LoginUser />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tarrifs" element={<Rates />} />
        <Route path='/payment' element={<StripeWrapper />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/commercial' element={<Commercial/>}/>
        
        {/* <Route path='/logout' element={<Logout />} /> */}
 <Route
  path="/order"
  element={
    <ProtectedRoute role="user" message="Sifariş etmək üçün login olun.">
      <Order />
    </ProtectedRoute>
  }
/>
  <Route path="/dashboardHome" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
  <Route path="/admin/panel" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
   
      </Routes>
    </AuthLoader>
     
    </BrowserRouter>
  );
};

export default Router;
