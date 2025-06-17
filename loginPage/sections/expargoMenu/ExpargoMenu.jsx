import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import style from './ExpargoMenu.module.scss';

import { IoHomeOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { PiBellRingingBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

import { useLogoutMutation } from '../../../../redux/reducers/UserApiSlice';  // düzgün yol yoxla
import { logout } from '../../../../redux/reducers/authSlice';                // düzgün yol yoxla
import Logout from '../logout/Logout';

const ExpargoMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // BURADA logoutApiCall hook-dan alınır
  const [logoutApiCall] = useLogoutMutation();

  const handleOrderClick = () => {
    if (user && user.role === 'user') {
      navigate('/order');
    } else {
      alert('Sifariş etmək üçün istifadəçi kimi daxil olun.');
      navigate('/loginUser');
    }
  };

  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  const handleCancel = () => {
    setLogoutOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await logoutApiCall().unwrap();  // burada artıq logoutApiCall var və çağırılır
      dispatch(logout());              // redux-dan user-u sil
      localStorage.removeItem('user'); 
      localStorage.removeItem('token');
      setLogoutOpen(false);
      navigate('/loginUser');
    } catch (error) {
      console.error('Logout zamanı xəta:', error);
      alert('Çıxış zamanı problem yarandı');
    }
  };

  return (
    <div className={style.expargoMenu}>
      <img src="https://dash.expargo.com/assets/img/expargo_logo.svg" alt="Expargo Logo" />

      <div className={style.navBar}>
        <ul>
          <li><a href="#" onClick={() => navigate('/')}><IoHomeOutline /> Əsas səhifə</a></li>
          <div className={style.line}></div>

          <li><a href="#" onClick={() => navigate('/packages')}><GoPackage /> Bağlamalar</a></li>
          <div className={style.line}></div>

          <li><a href="#" onClick={() => navigate('/requests')}><LuMessageSquareMore /> Müraciətlər</a></li>
          <div className={style.line}></div>

          <li><a href="#" onClick={() => navigate('/profile')}><FaRegUser /> Profil</a></li>
          <div className={style.line}></div>

          <li><a href="#" onClick={() => navigate('/notifications')}><PiBellRingingBold /> Bildirişlər</a></li>
          <div className={style.line1}></div>
        </ul>
      </div>

      <button className={style.btn1} onClick={handleOrderClick}>
        <FaPlus /> Sifariş et
      </button>

      <button className={style.btn2} onClick={handleLogoutClick}>
        <IoIosLogOut /> Çıxış et
      </button>

      {logoutOpen && (
        <Logout onCancel={handleCancel} onConfirm={handleConfirm} />
      )}
    </div>
  );
};

export default ExpargoMenu;
