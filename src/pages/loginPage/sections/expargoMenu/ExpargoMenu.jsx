import React from 'react';
import style from './ExpargoMenu.module.scss'
import { IoHomeOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { PiBellRingingBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
const ExpargoMenu = () => {
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
                    <button className={style.btn1}><FaPlus /> Sifariş et</button>
                    <button className={style.btn2}><IoIosLogOut /> Çıxış et</button>

                </div>
  );
}

export default ExpargoMenu;
