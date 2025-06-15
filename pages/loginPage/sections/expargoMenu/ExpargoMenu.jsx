// import React from 'react';
// import style from './ExpargoMenu.module.scss'
import { IoHomeOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { PiBellRingingBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import style from './ExpargoMenu.module.scss';
// ... ikonlar

const ExpargoMenu = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user); // istifadəçini al

  const handleOrderClick = () => {
    if (user) {
      navigate('/order');
    } else {
      navigate('/loginUser');
    }
  };

  return (
    <div className={style.expargoMenu}>
      <img src="https://dash.expargo.com/assets/img/expargo_logo.svg" alt="" />
      <div className={style.navBar}>
        <ul>
          <li><a href=""><IoHomeOutline /> Əsas səhifə</a></li>
          <div className={style.line}></div>
          <li><a href=""><GoPackage /> Bağlamalar</a></li>
          <div className={style.line}></div>
          <li><a href=""><LuMessageSquareMore /> Müraciətlər</a></li>
          <div className={style.line}></div>
          <li><a href=""> <FaRegUser /> Profil</a></li>
          <div className={style.line}></div>
          <li><a href=""><PiBellRingingBold /> Bildirişlər</a></li>
          <div className={style.line1}></div>
        </ul>
      </div>

      {/* 👇 burada dəyişiklik oldu */}
      <button className={style.btn1} onClick={handleOrderClick}>
        <FaPlus /> Sifariş et
      </button>

      <button className={style.btn2}>
        <IoIosLogOut /> Çıxış et
      </button>
    </div>
  );
};

export default ExpargoMenu;
