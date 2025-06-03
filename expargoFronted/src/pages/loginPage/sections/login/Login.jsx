import React from 'react';
import style from './Login.module.scss'
import { IoHomeOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { PiBellRingingBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { FaRegMap } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    return (
        <div className={style.login}>
            <div className={style.container}>
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
                    <button  className={style.btn1}><FaPlus /> Sifariş et</button>
                    <button  className={style.btn2}><IoIosLogOut /> Çıxış et</button>

                </div>
                <div className={style.expargoLogin}>
                    <div className={style.loginContainer}>
                        <div className={style.img}>
 <img src="https://dash.expargo.com/assets/img/expargo_logo.svg" alt="" />
                        <p>Sizə Yaxın Kargo</p>
                        </div>
                       
                        <div className={style.login}>
                            <img src="https://dash.expargo.com/assets/img/welcome.svg" alt="" />
                            <div className={style.expargologinContainer}>
                                <button className={style.loginBtn1}>DAXIL OL</button>
                                <button className={style.loginBtn2}>QEYDIYYAT</button>
                                <div className={style.cards}>
                                    <div className={style.card}>
                                        <FaRegMap />
                                        <h4>Xidmət şəbəkəsi</h4>
                                    </div>
                                    <div className={style.card}>
                                        <IoPricetagsOutline />
                                        <h4>Tariflər</h4>
                                    </div>
                                    <div className={style.card}>
                                        <LuPhone />
                                        <h4>Əlaqə</h4>

                                    </div>

                                </div>
                                <h2>Daha çox</h2>
                                <p onClick={()=>navigate('/')}>www.expargo.com</p>

                            </div>
                        </div>
                            <span>Version: 2.1.1</span>


                    </div>
                </div>

            </div>

        </div>
    );
}

export default Login;
