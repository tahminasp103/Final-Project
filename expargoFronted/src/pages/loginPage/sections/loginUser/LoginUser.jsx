// src/pages/loginPage/sections/loginUser/LoginUser.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import ExpargoMenu from '../expargoMenu/ExpargoMenu';
import style from './LoginUser.module.scss';
import { useLoginMutation } from '../../../../redux/reducers/authApiSlice';
import { setCredentials } from '../../../../redux/reducers/AuthSlice';

const LoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

  // Gələcək yönləndirməni saxla (əgər mövcud deyilsə /dashboardHome)
  const from = location.state?.from?.pathname || '/dashboardHome';

const handleLogin = async () => {
  try {
    const userData = await login({ email, password }).unwrap(); // userData.user və userData.token gəlir
    console.log("userData:", userData); // yoxlamaq üçün

    dispatch(setCredentials({
      user: userData.user,
      token: userData.token, // <<< Tokeni Redux-da saxla
    }));

    navigate(from, { replace: true });
  } catch (err) {
    console.error('Login error:', err);
  }
};
  return (
    <div className={style.loginUser}>
      <ExpargoMenu />
      <div className={style.loginUserContainer}>
        <h3 onClick={() => navigate('/login')}><IoIosArrowBack /> Daxil ol</h3>
        <div className={style.container}>
          <div className={style.img}>
            <img src="https://dash.expargo.com/assets/img/expargo_circle.svg" alt="" />
          </div>
          <h2>Daxil ol</h2>
          <div className={style.loginForm}>
            <div className={style.inp}>
              <label>E-mail | Müştəri kodu</label>
              <input
                type="text"
                placeholder="email və ya müştəri kodunuz"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={style.inp}>
              <label>Şifrə</label>
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <MdOutlineRemoveRedEye onClick={() => setShowPwd(prev => !prev)} />
            </div>
            <p>Şifrənin bərpası</p>
            <button className={style.btn1} onClick={handleLogin} disabled={isLoading}>
              {isLoading ? 'Gözləyin...' : 'DAXİL OL'}
            </button>
            <button className={style.btn2} onClick={() => navigate('/signup')}>
              QEYDİYYAT
            </button>
            {error && <p style={{ color: 'red' }}>Login səhvdir</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
