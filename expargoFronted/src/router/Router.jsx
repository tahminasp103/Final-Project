import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import LoginPage from '../pages/loginPage/LoginPage';

const Router = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<LoginPage/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default Router;
