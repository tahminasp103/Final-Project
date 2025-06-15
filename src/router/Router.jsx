import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import LoginPage from '../pages/loginPage/LoginPage';
import Registration from '../pages/loginPage/sections/registration/Registration';
import Admin from '../pages/admin/Admin';
import DashboardHome from '../pages/dashboardHome/DashboardHome';
import ProtectedRoute from '../pages/loginPage/sections/privateRoute/PrivateRoute';
import LoginUser from '../pages/loginPage/sections/loginUser/LoginUser';
import AdminPanel from '../components/cards/adminPanel/AdminPanel';
import AdminRoute from './AdminRoute';
import AdminLogin from '../pages/adminLogin/AdminLogin';
import ProfilePage from '../pages/loginPage/sections/profilePage/ProfilePage';
import Rates from '../pages/home/sections/rates/Rates';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/loginUser" element={<LoginUser />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tarrifs" element={<Rates/>} />
        <Route
          path="/dashboardHome"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/panel"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
