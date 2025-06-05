import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import LoginPage from '../pages/loginPage/LoginPage';
import Registration from '../pages/loginPage/sections/registration/Registration';
import LoginUser from '../pages/loginPage/sections/loginUser/LoginUser';

const Router = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup' element={<Registration/>}/>
    <Route path='/loginUser' element={<LoginUser/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default Router;
