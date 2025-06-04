import React from 'react';
import style from './LoginUser.module.scss'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ExpargoMenu from '../expargoMenu/ExpargoMenu';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const LoginUser = () => {
    const navigate = useNavigate()
  return (
            <div className={style.loginUser}>
            <ExpargoMenu />
            <div className={style.loginUserContainer}>
                <h3 onClick={() => navigate('/login')}><IoIosArrowBack /> Daxil ol</h3>
                <div className={style.container}>
                    <div className={style.img}><img src="https://dash.expargo.com/assets/img/expargo_circle.svg" alt="" /></div>
                    <h2>Daxil ol</h2>
                    <div className={style.loginForm}>
                        <div className={style.inp}>
                            <label htmlFor="">E-mail | Müştəri kodu</label>
                            <input type="text" placeholder='email və ya müştəri kodunuz' />
                        </div>

                        <div className={style.inp}>
                            <label htmlFor="">Şifrə</label>
                            <input type="password" />
                            <MdOutlineRemoveRedEye />
                        </div>
                        <p>Şifrənin bərpası</p>
                            <button className={style.btn1}>DAXİL OL</button>
                            <button className={style.btn2} onClick={()=>navigate('/signup')}>QEYDİYYAT</button>

                    </div>
                </div>
            </div>



        </div>
  );
}

export default LoginUser;
